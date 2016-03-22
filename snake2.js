/**
 * Created by Administrator on 2016/3/16.
 */
//drawBg("myCanvas");

var count = 0;//回合数
var mapX=12;
var mapY=15;
//地图数组
var map= new Array(
    new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
    ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0)
    ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0)
    ,new Array(0,1,1,1,0,1,1,1,1,1,0,1,1,1,0)
    ,new Array(0,1,1,0,0,1,1,1,1,1,0,0,1,1,0)
    ,new Array(0,1,1,1,1,1,1,0,1,1,1,1,1,1,0)
    ,new Array(0,1,1,1,1,1,1,0,1,1,1,1,1,1,0)
    ,new Array(0,1,1,0,0,1,1,1,1,1,0,0,1,1,0)
    ,new Array(0,1,1,1,0,1,1,1,1,1,0,1,1,1,0)
    ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0)
    ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0)
    ,new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
);
var validArr;

var dirX = new Array(-1,0,0,1);
var dirY = new Array(0,-1,1,0);

var snake = new Array(
    new Array(new Array()),
    new Array(new Array())
);

var ok,ok1;
var tmp=0,t=0,p=0;
var dirs = new Array();
var tx;
var ty;


//画背景
function drawBg(id) {
    validArr= new Array(
        new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
        ,new Array(0,0,1,1,1,1,1,1,1,1,1,1,1,1,0)
        ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0)
        ,new Array(0,1,1,1,0,1,1,1,1,1,0,1,1,1,0)
        ,new Array(0,1,1,0,0,1,1,1,1,1,0,0,1,1,0)
        ,new Array(0,1,1,1,1,1,1,0,1,1,1,1,1,1,0)
        ,new Array(0,1,1,1,1,1,1,0,1,1,1,1,1,1,0)
        ,new Array(0,1,1,0,0,1,1,1,1,1,0,0,1,1,0)
        ,new Array(0,1,1,1,0,1,1,1,1,1,0,1,1,1,0)
        ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,1,0)
        ,new Array(0,1,1,1,1,1,1,1,1,1,1,1,1,0,0)
        ,new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)
    );
    count=0;
    snake[0].splice(0,snake[0].length,[1,1]);
    snake[1].splice(0,snake[1].length,[mapX-2,mapY-2]);
    tx=snake[1][snake[1].length-1][0];
    ty=snake[1][snake[1].length-1][1];
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext("2d");

    /*
    image.onload = function () {
        context.drawImage(image,0,0);
    };
    */

    for(var i=0;i<map.length;++i){
        for(var j=0;j<map[0].length;++j){
            if(map[i][j]==1){
                drawSoil(id,i,j);
            }else if(map[i][j]==0){
                drawStone(id,i,j);
            }
        }
    }

    drawSnake(id);

}

function  drawSoil(id,i,j){
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext("2d");
    var soil = new Image();
    soil.src = "image/soil.png";//泥土背景
    soil.onload = function (){
        context.drawImage(soil,j*50,i*50);//数组坐标与canvas坐标不一致，需要矩阵转置
    }
}

function  drawStone(id,i,j){
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext("2d");
    var stone = new Image();//石头背景
    stone.src = "image/stone.png";
    stone.onload = function (){
        context.drawImage(stone,j*50,i*50);
    }
}

function drawScene(id){
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext("2d");

    if(!whetherGrow(count)){
        var del = snake[0].shift();
        if(map[del[0]][del[1]]==1){
            validArr[del[0]][del[1]]=1;
            drawSoil(id,del[0],del[1]);
        }else if(map[del[0]][del[1]]==0){
            drawStone(id,del[0],del[1]);
        }
        del=snake[1].shift();
        if(map[del[0]][del[1]]==1){
            validArr[del[0]][del[1]]=1;
            drawSoil(id,del[0],del[1]);
        }else if(map[del[0]][del[1]]==0){
            drawStone(id,del[0],del[1]);
        }
    }
    drawSnake(id);
}

function drawSnake(id){
    document.getElementById("turnCount").innerHTML=count;
    var canvas = document.getElementById(id);
    if (canvas == null)
        return false;
    var context = canvas.getContext("2d");

    dirs.splice(0,dirs.length);
     var head1 = new Image();
     head1.src = "image/head_G.jpg";
     var head2 = new Image();
     head2.src = "image/head_R.jpg";
     var body1 = new Image();
     body1.src = "image/body_G.jpg";
     var body2 = new Image();
     body2.src = "image/body_R.jpg";


     head1.onload = function(){
         context.drawImage(head1,snake[0][snake[0].length-1][1]*50+5,snake[0][snake[0].length-1][0]*50+5);
         if(snake[0].length>1){
             body1.onload = function () {
                 context.drawImage(body1,snake[0][snake[0].length-2][1]*50+5,snake[0][snake[0].length-2][0]*50+5);
             };
         }
     };
    head2.onload = function(){
        context.drawImage(head2,snake[1][snake[1].length-1][1]*50+5,snake[1][snake[0].length-1][0]*50+5);
        if(snake[1].length>1){
            body2.onload = function () {
                context.drawImage(body2,snake[1][snake[1].length-2][1]*50+5,snake[1][snake[1].length-2][0]*50+5);
                (over(id));
            };
        }
    };

    /*数组存储蛇图片
    var head = new Array(
        new Image(),
        new Image()
    );
    var body = new Array(
        new Image(),
        new Image()
    );
    head[0].src = "image/head_G.jpg";
    head[1].src = "image/head_R.jpg";

    body[0].src = "image/body_G.jpg";
    body[1].src = "image/body_R.jpg";

    for(var i=0;i<snake.length;++i){
        head[i].onload = function () {
            context.drawImage(head[i],snake[i][snake[i].length-1][1]*50+5,snake[i][snake[i].length-1][0]*50+5);
            if(count!=0){
                body[i].onload = function () {
                    context.drawImage(body[i],snake[i][snake[i].length-2][1]*50+5,snake[i][snake[i].length-2][0]*50+5);
                };
            }
        };
    }
*/



  //  document.getElementById("player2").innerHTML=tx+','+ty;
}


//蛇的移动
function move(id,dir){
    count++;

    var x=snake[0][snake[0].length-1][0];
    var y=snake[0][snake[0].length-1][1];
    switch(dir){
        case 0:
            x+=dirX[0];
            y+=dirY[0];
            break;
        case 1:
            x+=dirX[1];
            y+=dirY[1];
            break;
        case 2:
            x+=dirX[2];
            y+=dirY[2];
            break;
        case 3:
            x+=dirX[3];
            y+=dirY[3];
            break;
    }
    snake[0].push([x,y]);
    AImove();

    drawScene(id);

}
function over(id){
    if(!valid(snake[0][snake[0].length-1][0],snake[0][snake[0].length-1][1])){
        if(!valid(snake[1][snake[1].length-1][0],snake[1][snake[1].length-1][1])){
            alert("Count:"+count+",Game Draw");
        }else{
            alert("Count:"+count+",AI Win");
        }

        drawBg((id));
    }else if(!valid(snake[1][snake[1].length-1][0],snake[1][snake[1].length-1][1])){
        alert("Count:"+count+",Player Win");
        drawBg((id));
    }else{
        validArr[snake[0][snake[0].length-1][0]][snake[0][snake[0].length-1][1]]=0;
        validArr[snake[1][snake[1].length-1][0]][snake[1][snake[1].length-1][1]]=0;
    }
}

function whetherGrow(num)  //本回合是否生长
{
    if (num<=15) return true;
    if ((num-15)%3==0) return true;
    return false;
}

function isInBody(x,y)   //判断(x,y)位置是否有蛇
{
    for(var i=0;i<snake.length;++i){
        for(var j=0;snake[i].length>1&&j<snake[i].length-1;++j){
            if(x==snake[i][j][0]&&y==snake[i][j][1]){
                return true;
            }
        }
    }

    return false;
}

function valid(x,y)  //判断当前点是否合法
{
    if (map[x][y]==0||isInBody(x,y)||!validArr[x][y]){
        return false;
    }
    return true;
}

//-------------------------------------------下面是AI的A*算法及增强--------------------------------------------------




function AImove(){
    tx=snake[1][snake[1].length-1][0];
    ty=snake[1][snake[1].length-1][1];
    var ans=-1;
    if(count>10){
        ans=As();
    }
 //   document.getElementById("player2").innerHTML=ans;
    if(ans==-1) {
        ans = DSAhfl();
    }
    snake[1].push([tx+dirX[ans],ty+dirY[ans]]);

    return ans;
}


function My_validDirection(k)  //判断AI当前移动方向的下一格是否合法
{
    var x = tx+dirX[k];
    var y = ty+dirY[k];
 //   document.getElementById("player2").innerHTML=tx+','+ty;
    if (!valid(x,y)){

        return false;
    }

    return true;
}

var dfs_able;
var dfs_able1;
function dfs(step){//长距离深搜
    if(step==(mapX+mapY)/3+3)//到深搜带一定程度时停止
    {
        dfs_able=1;
        return 1;
    }

    for (var k=0;k<4;k++)
    {

        if (My_validDirection(k))
        {
            tx+=dirX[k];
            ty+=dirY[k];
            validArr[tx][ty]=0;

            dfs(step+1);

            validArr[tx][ty]=1;
            tx-=dirX[k];
            ty-=dirY[k];

            if(dfs_able&&step==1)//如果能走到那个程度
            {
                ok=1;
                dirs.push(k);
            }
        }
    }

    return 0;
}

function dfs1(step)//短距离深搜
{
    if(step==5)
    {
        dfs_able=1;
        return 1;
    }

    for (var k=0;k<4;k++)
    {
        if (My_validDirection(k))
        {

            tx+=dirX[k];
            ty+=dirY[k];
            validArr[tx][ty]=0;

            dfs1(step+1);

            validArr[tx][ty]=1;
            tx-=dirX[k];
            ty-=dirY[k];

            if(dfs_able&&step==1)
            {
                ok1=1;
                dirs.push(k);
            }
        }
    }

    return 0;
}




function DSAhfl()
{
    tmp = 0;
    t = 0;
    p = 0;
    ok = 0;
    ok1 = 0;
    dfs_able = 0;
    dfs(1);
    if (!ok){
        dfs1(1);
    }
    var ans=0;
    for(var k=0;k<4;++k)
    {
        var xx=tx+dirX[k],yy=ty+dirY[k];
        tmp=0;
        while(valid(xx,yy))
        {
            xx+=dirX[k];
            yy+=dirY[k];
            ++tmp;
        }

        if(ok)
        {
            for(var i=0;i<dirs.length;++i)
            {
                if(dirs[i]==k&&tmp>t)
                {
                    t=tmp;
                    ans=i;
                }
            }
        }
        else if(ok1)
        {
            for(var i=0;i<dirs.length;++i)
            {
                if(dirs[i]==k&&tmp>t)
                {
                    t=tmp;
                    ans=i;
                }
            }
        }
        else
        {
            p=1;
            for(var i=0;i<4;++i){
                if(valid(tx+dirX[i],ty+dirY[i])){
                    dirs.push(i);
                }
            }
            if(dirs.length==0){
                ans=0;
            }else{
                var dirsIndex = Math.floor(Math.random()*100)%dirs.length;
                ans=dirs[dirsIndex];
            }
        }
    }
 //   document.getElementById("player2").innerHTML=dirs+",ans:"+ans+",ok1:"+ok1+",ok:"+ok;
   if(ok||ok1){
        return dirs[ans%4];
    }else{
       return ans;
    }
}



function As()
{

//点对象
    function point(x,y){
        this.x=x;
        this.y=y;
    }
    point.prototype.f=0;
    point.prototype.g=0;
    point.prototype.h=0;
    var father ={};
    var fKey;
    /*
    * 在javascript中，对象本身就是一种Map结构。
    * var map = {};
     map['key1'] = 1;
     map['key2@'] = 2;

     console.log(map['key1']);//结果是1.
     console.log(map['key2@']);//结果是2.

     //如果遍历map
     for(var prop in map){
     if(map.hasOwnProperty(prop)){
     console.log('key is ' + prop +' and value is' + map[prop]);
     }
     }
    * */
    var tx=snake[1][snake[1].length-1][0];
    var ty=snake[1][snake[1].length-1][1];
    var tx1=snake[0][snake[0].length-1][0];
    var ty1=snake[0][snake[0].length-1][1];
    var start = new point(tx,ty);
    var tempStart = new point(tx,ty);
    var OpenList = new Array();
    var CloseList = new Array();

    OpenList.push(start);

    while(OpenList.length>0)
    {
        var iclose = 0;
        tempStart = OpenList[0];
        for(var i=1;i<OpenList.length;++i)//选择f最小的点
        {
            if(OpenList[i].f<tempStart.f)
            {
                tempStart=OpenList[i];
                iclose=i;
            }
        }
        OpenList.splice(iclose,1);//将f最小的点从开启列表中删除
        CloseList.push(tempStart);//将f最小的点加入关闭列表
        for(var i=0;i<4;++i)//四个方向进行拓展
        {
            var exist=0,close=0;
            var p = new point(tempStart.x+dirX[i],tempStart.y+dirY[i]);

            for(var j=0;j<CloseList.length;++j)//如果拓展的点已经在关闭列表则不进行后续操作
            {
                if(CloseList[j].x==p.x&&CloseList[j].y==p.y)
                {
                    close=1;
                    break;
                }
            }

            if((valid(p.x,p.y)&&!close)
                ||(p.x==tx1&&p.y==ty1))//如果拓展的点有效或者已经到达目标点
            {
                for(var j=0;j<OpenList.length;++j)//检测该点是否在开启列表中
                {
                    if(OpenList[j].x==p.x&&OpenList[j].y==p.y)
                    {
                        exist=1;
                        break;
                    }
                }
                if(exist)//如果存在就修改点的数据
                {
                    var g=tempStart.g+1;
                    if(g>p.g)
                    {
                        fKey = tempStart.x+","+tempStart.y;
                        tempStart=father[fKey];
                        p.g=Math.abs(p.x-tempStart.x)+Math.abs(p.y-tempStart.y);
                        p.f=p.g+p.h;
                    }
                }
                else//如果不存在开启列表中则将其加入开启列表，计算数据并且设置其父节点为tempStart
                {
                    p.g=Math.abs(p.x-tempStart.x)+Math.abs(p.y-tempStart.y);
                    p.h=Math.abs(p.x-tx1)+Math.abs(p.y-ty1);
                    p.f=p.g+p.h;
                    OpenList.push(p);
                    fKey = p.x+","+p.y;
                    father[fKey]=tempStart;
                //    alert("1,3 father "+father[new point(1,3)].x+","+father[new point(1,3)].y);
                }
            }
        }
        //father的存储方式有问题
      //  alert("1,3 father "+father[new point(1,3)].x+","+father[new point(1,3)].y);
        for(var i=0;i<OpenList.length;++i)//检测目标点是否已经在开启列表中
        {
            if(OpenList[i].x==tx1&&OpenList[i].y==ty1)
            {

    //            var step=1;
                var a=tx1,b=ty1,xx=tx1,yy=ty1;
                fKey=xx+","+yy;
                while(father[fKey].x!=tx||father[fKey].y!=ty)//必须要new，不然是undefined
                {
     //               alert(xx+","+yy);
     //               ++step;
                    a=father[fKey].x;
                    b=father[fKey].y;
                    xx=a;yy=b;
                    fKey=xx+","+yy;
                }
            //    alert("检测目标点"+tx1+","+ty1+"已经在开启列表中"+"从"+tx+","+ty+"爬向"+xx+","+yy);
                //if(step==1)
                //{
                //    OpenList.splice(i,1);
                //    break;
                //}

                if(xx==tx)
                {
                    if(yy>ty)
                    {
                        return 2;
                    }
                    else
                    {
                        return 1;
                    }
                }
                else
                {
                    if(xx>tx)
                    {
                        return 3;
                    }
                    else
                    {
                        return 0;
                    }
                }
            }
        }

    }
    return -1;
}