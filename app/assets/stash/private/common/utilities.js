function build_display_name(obj){
	name = ''
	if( obj.first_name  ) name += obj.first_name
	if( obj.middle_name ) name += ' ' + obj.middle_name
	if( obj.last_name   ) name += ' ' + obj.last_name
	if( obj.gender      ) name += ' ('+obj.gender+')'
	return name
};
