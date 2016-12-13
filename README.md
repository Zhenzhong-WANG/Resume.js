##前端简历模板

*What's this?
     模仿Sublime编辑器风格的打字机效果的建立模板
*How to use?
     1. <pre><code><canvas id="canvas" height="1000px" width="600px"></canvas></pre></code>
     2.
     <pre><code>
     var json={
   		'Introduction':{
   			'Name':'狗鱼',
   			'School':"NorthEasten Unversity",
   			'Major':' Computer Science and Technology',
   			'Skills':[ 'Javascript','CSS/CSS3','Java','Android'],
   		},
   		'Projects':[
   		{
   			'Name':'项目名称 Project Name',
   			'Do':['Description','Description']
   		},{
         'Name':'项目名称 Project Name',
   			'Do':['Description','Description','Description']
   		},{
         'Name':'项目名称 Project Name',
   			'Do':['Description']
   		},{
         'Name':'项目名称 Project Name',
   			'Do':['Description','Description']
   		},{
         'Name':'项目名称 Project Name',
   			'Do':['Description','Description','Description','Description']
   		},{
         'Name':'项目名称 Project Name',
   			'Do':['Description','Description']
   		}],
   		'Experience':[{
   			'Name':'东北大学吃瓜三等奖',
   			'Do':['在2014-2015学年吃瓜中表现优异']
   		},{
         'Name':'东北大学吃瓜三等奖',
   			'Do':['在2013-2014学年吃瓜中表现优异']
   		},{
         'Name':'东北大学吃瓜三等奖',
   			'Do':['在2015-2016学年吃瓜中表现优异']
   		},{
   			'Name':'搜狐实习',
   			'Do':['1.日常搬砖','2.日常搬砖']
   		},{
   			'Name':'GitHub:https://github.com/wonggigi/',
   			'Do':['Description']
   		},{
   			'Name':'Blog:http://www.wonggigi.com/',
   			'Do':['Description']
   		}]
   	}
    </pre></code>
    3.
    <pre><code>var canvas=document.getElementById('canvas');
  	var ctx=canvas.getContext("2d");
  	Resume.render(ctx,json);</pre></code>
*What looks like
![](https://github.com/wonggigi/Resume.js/blob/master/img/img1.png)
