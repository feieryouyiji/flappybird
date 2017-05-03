/**
 * Created by 冯飞林 on 2017/4/25.
 */

(function (w) {
    /**
     *
     * @param ctx 绘制环境
     * @param imgObj 图片对象
     * @constructor 构造器
     */
    function Scene( ctx, imgObj ) {

        this.ctx = ctx;
        this.imgObj = imgObj;

        // 听众队列
        this.listeners = [];

        // 该场景所需的所有角色
        this.roles = [];
        this._initRoles();
    }
    Scene.prototype ={
        constructor: Scene,
        _initRoles : function () {

            //背景2个
            this.roles.push(getSky(ctx,this.imgObj.sky));
            this.roles.push(getSky(ctx,this.imgObj.sky));

            //管道6个
            for( var i=0;i<6;i++){
                this.roles.push(getPipe(this.ctx,this.imgObj.pipeDown,this.imgObj.pipeUp,130,this.imgObj.land.height,20,3))
            };

            //大地4个
            for ( var i = 0; i < 4; i++ ) {
                this.roles.push( getLand( this.ctx, this.imgObj.land, 3 ) );
            };

            //鸟1个
            this.roles.push(getBird(ctx,this.imgObj.bird,3,1,10,10));


        },

        //添加听众
        addListener: function (listenner) {
            this.listeners.push(listenner);
        },

        //小鸟死亡
        birdDead: function () {
            this.listeners.forEach(function (fn) {
                fn();
            })

        },

        //让所有角色开始表演

        draw: function () {
            // 每次绘制新的场景画面时，判断小鸟有没有碰撞，如果有，通知所有听众。
            var bird = getBird();
            var birdCoreX = bird.x + bird.width / 2;
            var birdCoreY = bird.y + bird.height / 2;


            // 如果小鸟撞向管道，或者飞出天空，或者duang~duang~duang，那么游戏结束
            if ( this.ctx.isPointInPath( birdCoreX, birdCoreY )
                || birdCoreY < 0
                || birdCoreY > (this.ctx.canvas.height - this.imgObj.land.height) ){

                // 监听到了小鸟死亡
                this.birdDead();
            }

            // 小鸟没有死亡，才继续绘制
            else {
                // 先清除上一次绘制的6个管道路径，
                // 然后再按照新的位置绘制新路径
                this.ctx.beginPath();
                this.roles.forEach( function( role ) {
                    role.draw();
                    role.update();
                } );
            }



        }

    }

    // 工厂
    w.getGameScene = function( ctx, imgObj ) {
        return new Scene( ctx, imgObj );
    }

})(window)

