class A1::CustomersController < A1::BaseController
  
  def index
    respond_with current_user.agency.customers.to_a
  end

  def create
    values = customer_params.merge(agency_id: current_user.agency.id)
    puts "*** customer create. values=#{values}"
    customer = Customer.create(values)
    if customer.save
      puts "--- save worked. customer=#{customer}"
      respond_with(:a1,customer)
    else
      render :json => { :errors => customer.errors }, :status => 422
    end
  end

  def show
    customer = Customer.find(params[:id])
    respond_with(:a1,customer)
  end

  def update
    puts "*** customer update. customer_params=#{customer_params}"
    customer = Customer.find(params[:id])
    customer.update!(customer_params)
    respond_with(:a1,customer)
  end
  
  def destroy
    puts "*** customer destroy. id=#{params[:id]}"
    customer = Customer.find(params[:id])
    customer.destroy!
    respond_with(:a1,customer)
  end

  private
  
  def customer_params
    params.require(:customer).permit(:company_name, :contact_name, :contact_email, :contact_phone)
  end  
  
end
