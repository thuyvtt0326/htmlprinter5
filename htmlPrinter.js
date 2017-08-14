var html2canvas = require('html2canvas');
var jspdf = require('jspdf');

 htmlPrinter = {

    toIMG: function(html, width, height){
        var a = document.createElement("a");
        a.setAttribute('id','home');
        a.setAttribute('href', '#');
        a.click();
        html2canvas(html , {
            
            onrendered: function(canvas) {
             
                var extra_canvas = document.createElement("canvas");
                extra_canvas.setAttribute('width',width);
                extra_canvas.setAttribute('height',height);
                var ctx = extra_canvas.getContext('2d');
                ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,width,height);
                var dataURL = extra_canvas.toDataURL('image/png');
                var b= document.createElement("a");
                b.setAttribute('id', 'all');
            
                document.body.appendChild(b);
                var c = $('#all').get(0);
                c.href='#';
                c.href = dataURL;
                c.download = 'html5printer.png';
                c.click();
            }
        });
    },

  toPDF: function (html){ 
   		 var a = document.createElement("a");
        a.setAttribute('id','home');
        a.setAttribute('href', '#');
        a.click();    
	    html2canvas(html, {
		   
            onrendered: function(canvas) {
            	var doc = new jspdf('p', 'mm', 'a4');
                var imgWidth = doc.internal.pageSize.width; 
                var pageHeight = doc.internal.pageSize.height;   
				var imgHeight = canvas.height * imgWidth / canvas.width;
				var heightLeft = imgHeight;
        		var position = 0;

            	var image= canvas.toDataURL("image/png");
            	doc.addImage(image, 'PNG', 10, 10 , imgWidth-20, imgHeight);
                heightLeft -= pageHeight-10 ;

         		while (heightLeft > 0) {
 				position = heightLeft - imgHeight;
  				doc.addPage();
  				doc.addImage(image, 'PNG',10, position, imgWidth-20, imgHeight);
  				heightLeft -= pageHeight;
				}
	            //.addImage(image,'PNG',10,10,imgWidth-20,0);
	            doc.save('test.pdf')
	            
	        },

		});
		
			
		
	}
}

