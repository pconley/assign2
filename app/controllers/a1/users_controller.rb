class A1::UsersController < A1::BaseController
  
  ### ABSTRACT CONTROLLER
    
  def index
    trace "*** user index. params=#{params}"
    trace "--- current_user   = #{current_user}"
    trace "--- current_agency = #{current_agency}"
    users = current_agency.users_with_role(role).to_a
    trace "--- users = #{users}"
    render :json => filter(users), :status => 200
  end

  def create
    values = user_params.merge(agency_id: current_user.agency.id, role: role)
    trace "*** user create. params=#{params}"
    trace "*** user create with values=#{values}"
    user = current_agency.users.create(values)
    trace "*** user created. user=#{user}"
    if user.save
      trace "--- save worked. user=#{filter(user)}"
      render :json => filter(user), :status => 200
    else
      trace "--- save failed. errors=#{user.errors.full_messages[0]}"
      render :json => { :errors => user.errors }, :status => 422
    end
  end

  def show
    user = current_agency.users_with_role(role).find(params[:id])
    trace "*** user#show: user=#{filter(user)}"
    respond_with(filter(user))
  end

  def update
    trace "*** user update. user_params=#{user_params}"
    user = current_agency.users_with_role(role).find(params[:id])
    user.update(user_params)
    if user.save
      trace "--- save worked. user=#{filter(user)}"
      render :json => filter(user), :status => 200
    else
      render :json => { :errors => user.errors }, :status => 422
    end    
  end
  
  def destroy
    trace "*** user destroy. id=#{params[:id]}"
    user = current_agency.users_with_role(role).find(params[:id])
    user.destroy!
    render :json => filter(user), :status => 200
  end

  private
  
  def base_response_attribs
    %w(id email username first_name last_name middle_name)
  end
    
  def base_permitted_params
    %i(email password username first_name last_name middle_name)
  end
  
  
  def filter_attribs(user)
    # this method is called by the api_controller::filter in the responds to control returned attributes
    user.slice(*response_attribs) # response_attributes are set in the inheriting controller    
  end  
  
  def user_params
    # this method is called by the update and create actions to gather safe params to set in the database
    params.require(role).permit(*permitted_params) # permitted_params are set in the inheriting controller
  end  
  
end
