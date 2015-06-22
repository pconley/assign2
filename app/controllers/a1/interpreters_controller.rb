class A1::InterpretersController < A1::BaseController
  
  def index
    interpreters = current_user.agency.interpreters.to_a
    respond_with(filter(interpreters))
  end

  def create
    values = interpreter_params.merge(agency_id: current_agency.id, role: :interpreter)
    trace "*** interpreter create. values=#{values}"
    interpreter = User.create(values)
    if interpreter.save
      trace "--- save worked. interpreter=#{interpreter}"
      render :json => filter(interpreter), :status => 200
    else
      render :json => { :errors => interpreter.errors }, :status => 422
    end
  end

  def show
    interpreter = current_agency.interpreters.find(params[:id])
    trace "*** interpreter#show: interpreter=#{filter(interpreter)}"
    respond_with(filter(interpreter))
  end
    
  def update
    trace "*** interpreter update. interpreter_params=#{interpreter_params}"
    interpreter = current_agency.interpreters.find(params[:id])
    interpreter.update(interpreter_params)
    if interpreter.save
      trace "--- save worked. interpreter=#{filter(interpreter)}"
      render :json => filter(interpreter), :status => 200
    else
      render :json => { :errors => interpreter.errors }, :status => 422
    end    
  end
  
  def destroy
    trace "*** interpreter destroy. id=#{params[:id]}"
    interpreter = current_agency.interpreters.find(params[:id])
    interpreter.destroy! if interpreter
    render :json => filter(interpreter), :status => 200
  end

  private
  
  def filter_attribs(interpreter)
    # this method is called by the api_controller::filter in the respond to control which attributes are returned
    interpreter.slice("id","email","username","last_name","first_name","middle_name","title","prefix","suffix","gender","default_payrate")      
  end  
  
  def interpreter_params
    params.require(:user).permit(:email, :password, :username, :last_name, :first_name, :middle_name, :title, :prefix, :suffix, :gender, :default_payrate)
  end  
  
end
