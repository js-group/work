# 代码清单
* call和apply的异同与特性


```js

/**
 * 算法 类 [加减乘除]
 * @param {int} a
 * @param {int} b
 */
var algorithm = function(a,b){
	var _this = this;
	
	// typeof [number,boolean,string,function,object,undefined]
	if(typeof a !== 'number' || typeof b !== 'number'){
		console.log('type error');
		console.log(a);
	    console.log(b);
		return false;
	}
	
	// 加
	_this.plus = function(){
		return a+b;
	}
	// 减
	_this.minus = function(){
		return a-b;
	}
	// 乘
	_this.multiply = function(){
		return a*b;
	}
	// 除
	_this.division = function(){
		return a/b;
	}
};

// 应用场景1
var c = new algorithm(3,4);
console.log(c.plus());

// 应用场景2
function account(a,b){
	algorithm.apply(this,[a,b]);
}
var d = new account(3,5);
console.log(d.plus());

// 应用场景3
function sum(a,b){
	algorithm.call(this,a,b);
}
var f = new sum(7,4);
console.log(f.plus());


// 广告对象
var advertising = {
	des:'描述信息:',
	color:'字体色彩:'
}
// 发布广告
function pulishAdv(t,c){
	console.log(this.des+t);
	console.log(this.color+c);
}
// 调用
pulishAdv.call(advertising,'招聘前端','black');
pulishAdv.apply(advertising,['招聘前端','black']);

// 获得删除的第一个元素的值
// 写法1
var t = [2,5,6];
console.log(t.shift());

// 写法2
var s = [4,5,6];
console.log(Array.prototype.shift.call(s));

// 调用方法
function aa(){
	console.log(this);
	console.log('aa');
}

function bb(){
	console.log(this);
	console.log('bb');
}
aa.call(aa); // === aa.apply();
aa.call.call(bb); // === bb.apply()
console.log(aa.apply() === bb.call.call(aa));

/**
 * 
 * @param {Object} o
 */
Function.prototype.show = function(o){
	return this.apply(o,Array.prototype.slice.call(arguments,1));
}
aa.show([44,33]);
// [44, 33] 
aa.show('2016年终庆典'); 
// String {0: "2", 1: "0", 2: "1", 3: "6", 4: "年", 5: "终", 6: "庆", 7: "典", length: 8, [[PrimitiveValue]]: "2016年终庆典"}
aa.show(advertising);
// Object {des: "描述信息:", color: "字体色彩:"}
aa.show(23);
// Number {[[PrimitiveValue]]: 23}

```

* [js-group](https://github.com/js-group)


