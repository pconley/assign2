function build_display_name(obj){
	name = ''
	if( obj.first_name  ) name += obj.first_name
	if( obj.middle_name ) name += ' ' + obj.middle_name
	if( obj.last_name   ) name += ' ' + obj.last_name
	if( obj.gender      ) name += ' ('+obj.gender+')'
	return name
};

function toggle_row(row,collection){
	var starting_value = row.showDetails;
	if( !starting_value ){ 
		// this row is closed, so asking to open, therefore close any other open row
		angular.forEach(collection, function(c) { c.showDetails = false; });
	}
	row.showDetails = !starting_value; 
	//console.log('*** row details is nwq set to '+row.showDetails);
}
