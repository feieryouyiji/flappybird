/**
 * Created by 冯飞林 on 2017/4/25.
 */

(function (w) {
    <!--小鸟bird的构造函数-->
    /**
     *
     * @param ctx 绘图环境
     * @param img bird对象
     * @param widthFrame 一排帧数
     * @param heightFrame 一列帧数
     * @param x 小鸟的坐标x
     * @param y 小鸟的坐标y
     * @constructor
     */
    function Bird(ctx,img,widthFrame,heightFrame,x,y,s) {
        this.ctx=ctx;
        this.img =img;
        this.widthFrame=widthFrame;
        this.heightFrame =heightFrame;
        this.x =x;
        this.y =y;

        //一个鸟的宽高
        this.width = this.img.width/this.widthFrame;
        this.height = this.img.height/this.heightFrame;

        //小鸟当前帧数
        this.currentFrame = 0;
        this.speed =s || 1;
        this. Acceleration = 0.1;
        this._bind();
    }
    Bird.prototype ={
        constructor: Bird,

        draw: function () {

            //下落让小鸟旋转
            var baseRadian =Math.PI/180*10;
            var maxRadian =Math.PI/180*45;

            var rotateRadian = baseRadian*this.speed;
            rotateRadian = rotateRadian >= maxRadian? maxRadian : rotateRadian;




            this.ctx.save();

            this.ctx.translate( this.x + this.width / 2, this.y + this.height / 2 );
            this.ctx.rotate(rotateRadian);

            this.ctx.drawImage(this.img,
                this.width*this.currentFrame, 0, this.width, this.height,
                -this.width / 2, -this.height / 2, this.width, this.height
            )

            this.ctx.restore();
        },
        //计算下一帧时的数据
        update: function () {

            this.currentFrame=++this.currentFrame>= this.widthFrame? 0: this.currentFrame;
            this.y+=this.speed;
            this.speed += this. Acceleration;
        },

        _bind: function (){

            var self = this;
            this.ctx.canvas.addEventListener('click',function () {
                self.speed = -2;

            })
        }
    }


    var bird =null;

    w.getBird = function (ctx,img,widthFrame,heightFrame,x,y,s) {
        // 单利模式,整个游戏只要一个bird就够了
        if ( !bird ) {
            bird = new Bird(ctx,img,widthFrame,heightFrame,x,y,s);
        }

        return bird;
    }



})(window)
