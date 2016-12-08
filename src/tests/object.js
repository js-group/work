/**
 * js 对象
 * 
 */

(function() {

	// 文本标记法,创建对象 
	var fat = {};

	// 创建对象1
	var car = function() {
		this.color = 'black';
	};
	// 
	car.prototype = {
		run: function() {
			console.log('run run run');
		}
	};
	// Object函数进行对象的创建，当我们使用的new的时候，js解析器会分配一块内存空间，用以存放当前的对象的自有属性。之后解析器会给这一对象一个_proto_属性指向的原型对象内容。
	var biyt = new car();
	biyt.run();

	// 创建对象2
	var o = {
		get: function() {
			return this.name;
		},
		set: function(name) {
			this.name = name;
		}
	};

	/**
	 * ES5
	 * Object.create(proto, [ propertiesObject ]);
	 * proto 一个对象，作为新创建对象的原型。如果 proto 参数不是 null 或一个对象值，则抛出一个 TypeError 异常。null表示没有原型对象(这样就创建了一个"干净的对象")
	 * propertiesObject 一个对象值，可以包含若干个属性，属性名为新建对象的属性名，属性值为那个属性的属性描述符对象.
	 * value 设置属性的值
	 * writable 布尔值,设置属性是否可以被重写,默认属性值为false(不能被重写)
	 * enumerable 布尔值,设置属性是否可以被枚举,默认属性值为false(不能被枚举)
	 * configurable 布尔值,设置属性是否可以被删除，默认属性值为false(不能被删除)
	 * get 函数,设置属性返回结果
	 * set 函数,有一个参数
	 * 返回一个对象
	 */
	
	/**
	 * 属性描述符就是一个普通的js对象，描述某个对象的特性，有二种javascript属性。
	 * 数据属性有一个值以及三个性质：可枚举性（enumerable）、可写性（writable）、以及可配置性（configurable）。
	 * 访问器属性（accessor property）有一个getter和/或setter方法，以及可枚举性。
	 */

	// 创建对象3 [比较干净没有继承链]
	var per = Object.create({
		say: function() {
			console.log('coding ......');
		}
	});
	per.say();

	// 简单工厂模式
	var createCar = function(name, color, price) {
		return {
			name: name,
			color: color,
			price: price,
			run: function() {
				console.log(this.name + '开走了');
			},
			out: function() {
				console.log('看那个车的颜色是' + this.color + '色');
			}
		};
	}
	var bwm = createCar('宝马', '银白', '900w');
	bwm.out();

	// 构造函数模式
	function aa(a, b, c) {
		this.name = a;
		this.des = b;
		this.show = function() {
			console.log('------------' + c);
		}
	}
	var bb = new aa('bb', 'bbb', 'bbbb');
	bb.show();

	var lls = Object.create({
		a: 1,
		b: 2
	}, {
		c: {
			value: 3,
			writable: false, // 属性是否可写,false时value的值将不会被改变,如 ：lls.c = 5; console.log(lls.c)
			enumerable: false, // 可枚举性，false时， for..in循环、Object.keys方法、JSON.stringify方法将取不到该属性
			configurable: false // 基础配置，当为false时， delete，update 操作会无效 。如：delete lls.c;
		}
	});

	lls.c 
	// 3
	/**
	 * 返回自由的可枚举属性名
	 * Objec.keys 只包含对象本身的属性
	 * o 一个对象
	 */
	Object.keys(lls); // []
	// Object.getOwnPropertyNames 获取对象自身的所有属性，不受enumerable值影响
	Object.getOwnPropertyNames(lls); // ["c"]
	// for in 包括对象继承自原型对象的属性
	for(var i in lls) {
		console.log(lls[i]);
	}
	// 1 2

	JSON.stringify(lls); // "{}"

	var tsh = Object.create(Object.prototype, {
		type: {
			value: "淘实惠",
			enumerable: true,
			configurable: false, // 不能被删除
			writable: false // 不能被修改
		},
		number: {
			get: function() {
				if((typeof number) === "undefined") {
					//说明没有设置number
					return "您还没有加盟!请联系客服!";
				}
				return "您的账户号码是：" + number;
			},
			set: function(num) {
				number = num;
				if(this.cTime === 0) {
					console.log("欢迎使用！");
					this.cTime++;
				} else {
					console.log("登录名已被修改！");
				}
			}
		},
		cTime: {
			value: 0,
			writable: true
		}
	});
	tsh.number = 'test';
	// 欢迎使用！
	// test
	tsh.number = 'admin';
	// 登录名已被修改！
	// admin

	/**
	 * 创建或配置对象的多个属性
	 * Object.defineProperties(o,desc);
	 * o:要在其上创建或者配置属性的对象
	 * desc:将属性名映射到属性描述符的对象
	 * 返回对象
	 */
	Object.defineProperties(lls, {
		a: {
			value: "a",
			writable: false,
			enumerable: true,
			configurable: true
		},
		b: {
			value: "b",
			writable: false,
			enumerable: true,
			configurable: true
		}
	})
	for(var i in lls) {
		console.log(lls[i]);
	}
	// a b

	/**
	 * 创建或配置对象的一个属性
	 * Objec.defineProperty(o,name,desc);
	 * o:将在其上创建或配置属性的对象
	 * name:将创建或配置的属性名字
	 * desc:一个属性描述符对象，描述要创建的新属性或对现有属性的修改
	 * 返回对象
	 */
	Object.defineProperty(lls, "c", {
		value: "c",
		writable: false,
		enumerable: false,
		configurable: true
	});
	for(var i in lls) {
		console.log(lls[i]);
	}
	// a b c
	
	/**
	 * 将一个对象设为不可改变,不会影响继承属性
	 * Object.freeze(o)
	 * o:要冻结的对象
	 * 返回 布尔值
	 */
	var time = {
		year:1287,
		month:11,
		day:5
	};
	Object.freeze(time);
	time.year = 2001;
	console.log(time.year);
	// 一旦冻结无法解冻，慎用
	/**
	 * 判断对象是否不可改变
	 * Object.isFrozen(o)
	 * o 一个对象
	 * 返回布尔值
	 */
	console.log(Object.isFrozen(time)); // true
	
	/**
	 * 查询一个属性的特性
	 * Object.getOwnPropertyDescriptor(o,name)
	 * o 一个对象
	 * name 待查询的属性名
	 * 返回对象指定属性的一个属性描述符对象，如果不存在指定属性则返回undefine
	 */
	console.log(Object.getOwnPropertyDescriptor(lls,'c'));
	
	/**
	 * 得到非继承属性的名称
	 * Object.getOwnPropertyNames(o)
	 * o 一个对象
	 * 返回一个包含o的所有非继承属性的名字，包括哪些不可枚举的属性。{enumerable:false}
	 */
	console.log(Object.getOwnPropertyNames(lls)); // ["c", "a", "b"]
	
	/**
	 * 得到对象的原型
	 * Object.getPrototypeOf(o)
	 * o 一个对象
	 * 返回对象的原型
	 */
    console.log(Object.getPrototypeOf(lls));
    
    /**
     * 检查一个属性是否是继承的
     * Object.hasOwnProperty(propname);
     * propname 对象的属性名的字符串
     * 返回布尔值
     */
    console.log(lls.hasOwnProperty('c')); // true
    
    /**
     * 判断某个对象上是否可以添加新属性
     * Object.isExtensible(o);
     * o 一个对象
     * 返回布尔值
     */
    console.log(Object.isExtensible(lls)); // true
    
    /**
     * 禁止在一个对象上添加新的属性
     * Object.preventExtensions(o);
     * o 待设置可扩展的对象
     * 一旦设为不可不可扩展，它就再也不能改为可扩展
     */
    Object.preventExtensions(lls); // 设置为不可扩展
    console.log(Object.isExtensible(lls)); // false
    
    /**
     * 判断当前对象是否为另一个对象的原型
     * object.isPrototypeOf(o);
     * o 所有对象
     * 返回布尔值
     */
    console.log(Object.isPrototypeOf(lls)); // false
    Object.prototype.isPrototypeOf(Function.prototype) //true
    Array.prototype.isPrototypeOf([]) //true;
    Object.prototype.isPrototypeOf(new Object()); // true
    
    /**
     * 判断一个对象的属性是否可添加或删除
     * Object.isSealed(o);
     * o 待检查的对象
     * 返回布尔值
     * 如果不可以向一个对象添加新的（非继承）属性，并且现有的（非继承）属性不可删除，则是封闭的。
     * 封闭一个对象常用的方法是Object.seal(o) 或 Object.freeze(o)
     */
    Object.isSealed(lls); // false
    
    /**
     * 检测某个属性是否在for/in 中 循环可见
     * Object.propertyIsEnumerable(propname);
     * propname  包含对象的指定属性名的一个字符串
     * 返回布尔值
     * 如果对象有一个名为propname的非继承属性，并且该属性可以枚举，则返回true
     */
    lls.propertyIsEnumerable('a'); // true
    lls.propertyIsEnumerable('c'); // false
    
    /**
     * 阻止添加或删除对象的属性
     * Object.seal(o)
     * o 待封闭的对象
     * 返回处于封闭状态的参数对象o
     */
    
    /**
     * 对象本地的本地化字符串标示
     * Object.toLocaleString();
     * 返回对象本地的本地化字符串标示
     * Object类提供的默认的toLocaleString()方法只是简单的调用toString()方法。
     * 注意，其他类（Array、Date、Number等）都各自定义自己的这个方法的版本。用于执行本地化字符串转换。定义自己的的类时，可能也需要覆盖这个方法。
     */
     lls.toLocaleString();
     
     /**
      * 定义一个对象的字符串表示形式
      * Object.toString();
      * 返回一个对象的字符串表示形式
      * 在js程序中一般不会经常显示的调用toString()方法。一般情况下，在对象中定义这个方法，系统会在需要时自动调用它以便将该对象装换成字符串。
      */
     lls.toString();
     
     /**
      * 给定对象的原始值
      * Object.valueOf();
      * 返回与指定对象关联的原始值，如果存在这样一个值的话，如果没有与改对象关联的值，则返回对象本身
      */
     lls.valueOf();
     
     
     

})();