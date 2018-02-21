$(function(){
    showHide()
    subMenu()
    search()
    share()
    address()
    minicart()
    products()
    midumImg()
    movePic()
    showBig()
    // 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
    function showBig(){
        var $mask =$('#mask');//小黄块
        var $maskTop =$('#maskTop');//透明罩
        var $mediumImg=$('#mediumImg');
        var $largeImgContainer =$('#largeImgContainer');//大图容器
        var $largeImg=$('#largeImg');
        var maskWidth =$mask.width();
        var maskHeight =$mask.height();
        var mImgWidth=$mediumImg.width();
        var mImgHeight=$mediumImg.height();

        $maskTop.hover(function () {
          $mask.show();
          $largeImgContainer.show()
            $largeImg.show();
            //获取大图的src
            var srcM=$mediumImg.attr('src')
            var srcL=srcM.replace('m.jpg','l.jpg');
            $largeImg.attr('src',srcL);
            //定义大图容器的高宽
            $largeImgContainer.css({
                width:$largeImg.width()/2,
               height:$largeImg.height()/2
             })
            //绑定滑动中的事件 动态的修改小黄块的位置
            $maskTop.mousemove(function (event) {
                var left=0;
                var top=0;
                //事件对象的坐标
                var offsetX=event.offsetX;
                var offsetY=event.offsetY;
                left=offsetX-(maskWidth/2)
                top=offsetY-(maskHeight/2)
                //判断小黄块的边界值
                if(left<0){
                    left=0;
                }else if(left>mImgWidth-maskWidth){
                    left=mImgWidth-maskWidth;
                }
                if(top<0){
                    top=0
                }else if(top>mImgHeight-maskHeight){
                    top=mImgHeight-maskHeight
                }
                //给小黄块赋值
                $mask.css({
                    left:left,
                    top:top
                })
                //根据中图的位置确定大图的位置
                left=-left/mImgWidth*$largeImg.width();
                top=-top/maskHeight*$largeImg.height();
                $largeImg.css({
                    left:left,
                    top:top
                })
            })
        },function(){
            $mask.hide();
            $largeImgContainer.hide();
            $largeImg.hide()
        })
    }
    // 10. 点击向右/左, 移动当前展示商品的小图片
    function movePic(){
        //左右按钮
        var $backward =$('#preview h1 a:first');
        var $forward =$('#preview h1 a:last');
        var $list =$('#icon_list');//图片容器
        var pics =$list.children().length;//图片个数
        var show_img =5;
        var itemWidth=62;
        var threshold=pics-show_img;//阈值
        var imgCount=0;//左侧有几张图片
        if(threshold>imgCount){//初始化右键按钮的状态
           $forward.attr('class','forward')
        }
        $forward.click(function(){
            //获得当前按钮的class
            var nowClass=$(this).attr('class');
            if(nowClass!=='forward_disabled'){
                if(imgCount!==threshold){
                    imgCount++;
                    $list.css('left',imgCount*-itemWidth);
                    $backward.attr('class','backward')
                    if(imgCount===threshold){
                        $forward.attr('class','forward_disabled');
                    }
                }
            }
        })
        $backward.click(function(){
            var nowClass=$(this).attr('class');
            if(nowClass!=='forward_disabled'){
                if(imgCount!==0){
                    imgCount--;
                    $list.css('left',imgCount*-itemWidth);
                    $forward.attr('class','forward')
                    if(imgCount===0){
                        $backward.attr('class','backward_disabled');
                    }
                }
            }

        })
    }
    // 9. 当鼠标悬停在某个小图上,在上方显示对应的中图
    function midumImg(){
        $('#icon_list li').hover(function(){
            var $mediumImg =$('#mediumImg');//中图标
            $(this).children().addClass('hoveredThumb');//点击后添加效果
            var srcS =$(this).children().attr('src');//获得小图标
            var srcM=srcS.replace('.jpg','-m.jpg');
            $mediumImg.attr('src',srcM);
        },function(){
            $(this).children().removeClass('hoveredThumb');
        })
    }
    // 8. 点击切换产品选项 (商品详情等显示出来)
    function products(){
        $('#product_detail .main_tabs li').click(function(){
            $(this).siblings().removeClass('current');
           $(this).addClass('current');
             //获取当前的index
            var index =$(this).index();
             var $divs= $('#product_detail>div:not(:first)');
             $divs.hide();
            $divs[index].style.display='block';
        })
    }
    // 7. 鼠标移入移出切换显示迷你购物车
    function minicart(){
        $('#minicart').hover(function(){
            $(this).addClass('minicart');
            $(this).children('div').show();
        },function(){
            $(this).removeClass('minicart');
            $(this).children('div').hide();
        })
    }
    //5. 鼠标移入移出切换地址的显示隐藏
    // 6. 点击切换地址tab
    function address(){
        $('#store_select').hover(function(){
            $('#store_content,#store_close').show()
        },function(){
            $('#store_content,#store_close').hide()
        });
        $('#store_tabs li').click(function(){
            $(this).siblings().removeClass('hover');
            $(this).addClass('hover');
        });
        $('#store_close').click(function(){
            $('#store_content,#store_close').hide()
         })
    }
    //4. 点击显示或者隐藏更多的分享图标
/*    function share(){
        var isOpen = false;
        $('#shareMore').click(function(){
            if(isOpen){//关闭==》打开
                $('#dd').width('200')
                $(this).find('b').addClass('backword')
                $('a').prevAll(':gt(2)').show()
            }else{//打开
                $('#dd').width('155')
                $(this).find('b').removeClass('backword')
                $('a').prevAll(':gt(2)').hide()
            }
            isOpen=!isOpen;
        })
    }*/
  function share() {
    var isClose = true
    $('#shareMore').click(function () {
      if (isClose) { //当前关闭==>打开
        $('#dd').width('200px') //宽度增加
        $('a').prevAll(':gt(3)').show()
        $(this).children('b').addClass('backword')
        isClose = false
      } else { //当前打开==>关闭
        $('#dd').width('155') //宽度增加
        $(this).prevAll(':lt(2)').hide()
        $(this).children('b').removeClass('backword')
        isClose = true
      }
    })
  }
    //3. 输入搜索关键字, 列表显示匹配的结果
       // 1.写入数据的时候，出现智能提示
       // 2.失去焦点的时候，隐藏智能提示
       // 3.当输入框中有数据的时候，获得焦点 出现智能提示，
       // 4.当输入框中没有数据的时候，获得焦点 不出现智能提示
    function search(){
        $('#txtSearch')
            .on('keyup focus',function(){
                var value =this.value.trim()
                if(value){
                    $('#search_helper').show()
                }
            })
            .blur(function(){    //blur 当元素失去焦点发生的事件
                $('#search_helper').hide()
            })
    }
//2 鼠标移动切换二级导航菜单的隐藏与显示
    function subMenu(){
        $('#category_items .cate_item').hover(function(){
            $(this).children('.sub_cate_box').show()
        },function(){
            $(this).children('.sub_cate_box').hide()
        })
    }
    //1鼠标移入显示，移出隐藏
  function showHide(){
      $('[name=show_hide]').hover(function () {
          var id = $(this).attr('id')
          var subId = id + '_items'
          $('#' + subId).show()
      }, function () {
          var id = $(this).attr('id')
          var subId = id + '_items'
          $('#' + subId).hide()
      })
  }
})