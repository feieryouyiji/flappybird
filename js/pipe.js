/**
 * Created by 冯飞林 on 2017/4/25.
 */

(function (w) {

    /**
     管道的特点
     1: 成对出现 X轴共享
     2:  上下管道间的空格距离固定
     3:     高度随机生成
     */

    /**
     *
     * @param ctx   绘制环境
     * @param imgDown   口朝下是在上面
     * @param imgUp     口朝下上是下面
     * @param space     上下管道的间距
     * @param speed     移动的距离
     * @constructor     Pipe();
     */
    function Pipe(ctx,imgDown,imgUp,space,landHeight,minHeight,speed) {
        Pipe.len++;
        this.ctx = ctx ;
        this.imgDown =imgDown;
        this.imgUp = imgUp ;
        this.space = space ;
        this.landHeight = landHeight;
        this.minHeight = minHeight;
        this.speed = speed ||2;

        //管道默认的宽高
        this.width = this.imgDown.width;
        this.height = this.imgDown.height;

        //坐标coor
        this.x = 500+this.width*3*(Pipe.len-1);
        this.y =0;

        //初始化管道坐标
        this._init();


    }
    Pipe.len = 0;

    util.extend(Pipe.prototype,{

        //初始化管道坐标
        _init: function () {
            //管道的最大高度
            var maxHeight = this.ctx.canvas.height-this.landHeight-this.space-this.minHeight;
            var randomHeight =Math.random()*maxHeight;
            randomHeight<this.minHeight?this.minHeight:randomHeight;

            //上管道的坐标
            this.downY = randomHeight-this.height;

            //下管道高
            this.upY = randomHeight+this.space;

        },
        draw: function () {
            this.ctx.drawImage(this.imgDown,this.x,this.downY);
            this.ctx.drawImage(this.imgUp,this.x,this.upY);
            this._drawPath();
        },
        _drawPath:function () {
            this.ctx.rect( this.x, this.downY, this.width, this.height );
            this.ctx.rect( this.x, this.upY, this.width, this.height );
            this.ctx.stroke();
        },
        update: function () {
            this.x-= this.speed ;
            if(this.x<=-this.width){
                this._init();
                this.x += this.width * 3 * Pipe.len;

            }


        }
    });

    w.getPipe = function (ctx,imgDown,imgUp,space,landHeight,minHeight,speed) {
        return new Pipe(ctx,imgDown,imgUp,space,landHeight,minHeight,speed);
    };


})(window)



