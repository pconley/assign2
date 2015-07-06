class A1::AdminsController < A1::BaseController
  
  def index
    trace "*** admin index. params=#{params}"
    trace "--- current_user   = #{current_user}"
    trace "--- current_agency = #{current_agency}"
    admins = current_agency.admins.to_a
    trace "--- admins = #{admins}"
    render :json => filter(admins), :status => 200
  end

  def create
    values = admin_params.merge(agency_id: current_user.agency.id, role: 'admin')
    trace "*** admin create. params=#{params}"
    trace "*** user create with values=#{values}"
    admin = User.create(values)
    if admin.save
      trace "--- save worked. admin=#{filter(admin)}"
      render :json => filter(admin), :status => 200
    else
      render :json => { :errors => admin.errors }, :status => 422
    end
  end

  def show
    admin = User.admins.find(params[:id])
    trace "*** admin#show: admin=#{filter(admin)}"
    respond_with(filter(admin))
  end

  def update
    trace "*** admin update. admin_params=#{admin_params}"
    admin = User.find(params[:id])
    admin.update(admin_params)
    if admin.save
      trace "--- save worked. admin=#{filter(admin)}"
      render :json => filter(admin), :status => 200
    else
      render :json => { :errors => admin.errors }, :status => 422
    end    
  end
  
  def destroy
    trace "*** admin destroy. id=#{params[:id]}"
    admin = User.find(params[:id])
    admin.destroy!
    render :json => filter(admin), :status => 200
  end

  private
  
  def filter_attribs(admin)
    # this method is called by the api_controller::filter in the respond to control which attributes are returned    
    admin.slice("id","email","username","agency_id","first_name","last_name","middle_name","title","prefix","suffix","gender")      
  end  
  
  def admin_params
    params.require(:admin).permit(:email, :password, :username, :first_name, :last_name, :middle_name, :title, :prefix, :suffix, :gender)
  end  
  
end
