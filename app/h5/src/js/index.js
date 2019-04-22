require.config({
	paths: {
		"mui": "libs/mui.min"
	}
})

require(["mui"], function(mui) {

	//全局变量
	
	

	
	
	

	function init() {
		tab()
		getRender();
		add();
		
		document.querySelector("#time").placeholder = time();
	}

	//业务
	
	function time(){
		let newTime;
		let year = new Date().getFullYear();
		let month = new Date().getMonth() + 1;
		let day = new Date().getDate();
		return newTime = year + "-" + month + "-" + (day < 10 ? "0" + day : day);
	}

	function tab() {

		let lis = document.querySelectorAll(".tab li");

		mui(".tab").on("tap", "li", function() {
			for (var i = 0; i < lis.length; i++) {
				lis[i].classList.remove("active");
			}
			this.classList.add("active");
			//classList.toggle 添加样式
		})
	}

	function getRender() {
		mui.ajax('/api/getfind', {
			data: {

			},
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				console.log(res);
				var str = "";
				res.data.forEach(function(item) {
					str +=
						`
					<li><span>${item.time}</span>
					<span>${item.classify}</span>
					<span class="${item.style == '收入' ? "":"red" }">${item.money}</span>
					<span>${item.member}</span>
					<span>${item.remark}</span>
					</li>`
				})
				document.querySelector(".list").innerHTML = str;
			}
		});
	}

	function add() {
		document.querySelector(".ok").addEventListener("tap", function() {


			
			let style = document.querySelector(".tab .active").innerHTML;
			
			let index = document.querySelector(".select").selectedIndex;
			let option = document.querySelector(".select").options;


			let familyIndex = document.querySelector(".family").selectedIndex;
			let familyOption = document.querySelector(".family").options;

			// console.log( option[index].value);

			mui.ajax('/api/add', {
				data: {
					time: time(),
					money: document.querySelector("#money").value,
					remark: document.querySelector("#remark").value,
					classify: option[index].value,
					member: familyOption[familyIndex].value,
					style:style
				},
				dataType: 'json', //服务器返回json格式数据
				type: 'post', //HTTP请求类型
				timeout: 10000, //超时时间设置为10秒；
				success: function(res) {
					mui.alert(res.msg,'提示','btnValue',function () {
						getRender()
					})
				},
				error: function(xhr, type, errorThrown) {

				}
			});
		})

	}



	init()

})
