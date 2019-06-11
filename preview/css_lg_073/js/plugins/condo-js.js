(function($){
	var chart_container_obj;

	$(function () {
		chart_container_obj = $("#chart-container");

		var chart_b_total = parseInt(chart_container_obj.data('total-qty'), 10);
		var chart_b_sale_total = parseInt(chart_container_obj.data('sale-qty'), 10);
		var chart_b_rental_total = parseInt(chart_container_obj.data('rent-qty'), 10);
		var chart_b_units = parseInt(chart_container_obj.data('units'), 10);

		var revenueChart = new FusionCharts({
		  type: 'doughnut2d',
		  renderAt: 'chart-container',
		  width: '380',
		  height: '250',
		  dataFormat: 'json',
		  dataSource: {
		      "chart": {
		          "paletteColors": "#cfd0d0,#575858,#0072ac",
		          "bgColor": "#ffffff",
		          "showBorder": "0",
		          "use3DLighting": "0",
		          "showShadow": "0",
		          "enableSmartLabels": "0",
		          "startingAngle": "310",
		          "showLabels": "0",
		          "showPercentValues": "0",
		          "showLegend": 0,
		          "legendShadow": "0",
		          "legendBorderAlpha": "0",
		          "defaultCenterLabel": chart_b_units + "Units",
		          "centerLabelBold": "2",
		          "showTooltip": 0,
		          "labelDisplay": "none",
		          "decimals": "0",
		          "captionFontSize": "18",
		          "subcaptionFontSize": "14",
		          "subcaptionFontBold": "0",
		          "numberSuffix": "%"
		      },
		      "data": [
		          {
		              "value": chart_b_total
		          }, 
		          {
		              "value": chart_b_sale_total
		          }, 
		          {
		              "value": chart_b_rental_total
		          }
		      ]
		  }
		}).render();

		var hoverdef=$("#wpfloorplan .img-floorplan").attr("src");
		var el="#wpfloorplan";
		$('.wp-table-condo').find('.eventhover').mouseenter(function(){
			var b=$(this).data("img");
			if(b != ""){
				$(this).parents('.wp-floorplan-condo').find('.img-floorplan').find('img').attr("src", $(this).data('img'));
			}
		}).mouseleave(function(){
		var $wpTower = $(this).parents('.wp-floorplan-condo');
			$wpTower.find('.img-floorplan').find('img').attr("src", $wpTower.find('.wp-imagen img').attr('src'));
		});

		$('#dataTable-a').DataTable();
		$('#dataTable-b').DataTable();

	});

}(jQuery));