class A1::CustomersController < A1::BaseController
    
  def index
    trace "*** customer index. params=#{params}"
    trace "--- current_user   = #{current_user}"
    trace "--- current_agency = #{current_agency}"
    @customers = current_agency.customers.to_a
    trace "--- customers count = #{@customers.length}"
  end

  def create
    trace "*** customer create params=#{params}"
    values = customer_params.merge(agency_id: current_user.agency.id)
    trace "*** customer create values=#{values}"
    customer = Customer.create(values)
    if customer.save
      trace "--- save worked. customer=#{filter(customer)}"
      render :json => filter(customer), :status => 200
    else
      trace "--- save failed. error[0] = #{customer.errors.full_messages[0]}"
      render :json => { :errors => customer.errors }, :status => 422
    end
  end

  def show
    customer = Customer.find(params[:id])
    trace "*** customer#show: customer=#{filter(customer)}"
    respond_with(filter(customer))
  end

  def update
    trace "*** customer update. customer_params=#{customer_params}"
    customer = Customer.find(params[:id])
    customer.update(customer_params)
    if customer.save
      trace "--- save worked. customer=#{filter(customer)}"
      render :json => filter(customer), :status => 200
    else
      trace "--- save failed. error[0] = #{customer.errors.full_messages[0]}"
      render :json => { :errors => customer.errors }, :status => 422
    end    
  end
  
  def destroy
    trace "*** customer destroy. id=#{params[:id]}"
    customer = Customer.find(params[:id])
    customer.destroy!
    render :json => filter(customer), :status => 200
  end

  private
  
  def filter_attribs(customer)
    # this method is called by the api_controller::filter in the respond to control which attributes are returned
    customer.slice("id","company_name","contact_name","contact_email","contact_phone","billing_email","billing_rate")      
  end  
  
  def customer_params
    x = params.require(:customer).permit(:company_name, :contact_name, :contact_email, :contact_phone, :billing_email, :billing_rate)
    if( params && params['contact'] )
      x = x.merge(contact_name: params['contact']['name']) if params['contact']['name']
      x = x.merge(contact_email: params['contact']['email']) if params['contact']['email']
      x = x.merge(contact_phone: params['contact']['phone']) if params['contact']['email']
    end
    return x;
  end  
  
end
