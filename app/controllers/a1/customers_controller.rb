class A1::CustomersController < A1::BaseController
  
  def index
    respond_with current_user.agency.customers.to_a
  end

  def create
    values = customer_params.merge(agency: current_user.agency)
    puts "*** customer create. values=#{values}"
    respond_with(:a1,Customer.create(values))
  end

  def show
    respond_with Customer.find(params[:id])
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
