require 'rails_helper'

RSpec.describe A1::CustomersController, type: :controller do
  
  before :each do
    @user = FactoryGirl.create(:admin)
    sign_in @user
    @agency = @user.agency
    @customer1 = FactoryGirl.create(:customer, agency: @agency)
    @values1 = values(@customer1)
    @customer2 = FactoryGirl.create(:customer, agency: @agency)
    @values2 = values(@customer2)
  end
  
  def values(customer)
    fields =%w(id company_name contact_name contact_email contact_phone billing_email billing_rate) 
    customer.slice(*fields)     
  end
  
  describe "GET #index" do
    it "assigns all customers as @customers" do
      do_get(:index, true, {})
      expect(@body.length).to eq(2)
      expect(@body).to eq([@values1,@values2].as_json)
    end
  end

  describe "GET #show" do
    it "assigns the requested customer as @customer" do
      do_get(:show,true,{:id => @customer1.to_param})
      expect(@body).to eq(@values1.as_json)
    end
  end

  describe "POST #create" do
    before :each do
      @create_params = FactoryGirl.attributes_for(:customer, agency: nil)
      @create_params.delete(:agency) # not just nil... remove the param
    end
    context "with valid params" do
      it "creates a new Customer in DB" do
        expect {
          do_post(:create,true,{:customer => @create_params})
        }.to change(Customer, :count).by(1)
      end
      it "all the passed attribs are save as part of customer" do
        do_post(:create,true,{:customer => @create_params})
        expect(@body).to contain_values_of(@create_params)
      end
    end
    context "with invalid params" do
      it "assigns a newly created but unsaved customer as @customer" do
        @create_params.delete(:company_name)
        do_post(:create,false,{:customer => @create_params})
        error = {"errors"=>{"company_name"=>["can't be blank"]}}
        expect(@body).to eq(error)
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      before :each do
        @new_mail = 'newmail@testspec.com'
        @update_params = {:contact_email => @new_mail}
      end   
      it "updates the customer with attributes" do
        do_put(:update,true,{:id => @customer1.to_param, :customer => @update_params})
        expect(@body['contact_email']).to eq(@new_mail)
      end
      it "does not change the other attributes" do
        do_put(:update,true,{:id => @customer1.to_param, :customer => @update_params})
        expect(@body['company_name']).to eq(@customer1.company_name)
      end
    end
    context "with invalid params" do
      before :each do
        @update_params = {:company_name => ''}
      end   
      it "returns an error message" do
        do_put(:update,false,{:id => @customer1.to_param, :customer => @update_params})
        error = {"errors"=>{"company_name"=>["can't be blank"]}}
        expect(@body).to eq(error)
      end
      it "does not change the db record" do
        original_name = @customer1.company_name
        do_put(:update,false,{:id => @customer1.to_param, :customer => @update_params})
        expect(@customer1.reload.company_name).to eq(original_name)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested customer" do
      expect {
        do_delete(:destroy,true,{:id => @customer1.to_param})
      }.to change(Customer, :count).by(-1)
    end
    it "but returns the original object" do
      do_delete(:destroy,true,{:id => @customer1.to_param})
      expect(@body).to eq(@values1.as_json)
    end
  end

end
