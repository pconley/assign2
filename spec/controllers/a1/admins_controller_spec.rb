require 'rails_helper'

RSpec.describe A1::AdminsController, type: :controller do
  
  before :each do
    @admin0 = FactoryGirl.create(:admin)
    @values0 = values(@admin0)
    sign_in @admin0
    @agency = @admin0.agency
    @admin1 = FactoryGirl.create(:admin, agency: @agency)
    @values1 = values(@admin1)
    @admin2 = FactoryGirl.create(:admin, agency: @agency)
    @values2 = values(@admin2)
  end
  
  def values(admin)
    fields = %w(id email username agency_id last_name first_name middle_name title prefix suffix gender) 
    admin.slice(*fields)     
  end  
  
  describe "GET #index" do
    it "returns the list of admins" do
      do_get(:index, true, {})
      expected_set = [@values0,@values1,@values2]
      expect(@body.length).to eq(expected_set.length)
      expect(@body).to eq(expected_set.as_json)
    end
  end

  describe "GET #show" do
    it "assigns the requested admin as @admin" do
      do_get(:show,true,{:id => @admin1.to_param})
      expect(@body).to eq(@values1.as_json)
    end
  end

  describe "POST #create" do
    before :each do
      @create_values = {email: 'admin@spec.tst', username: 'admin'}
      @create_params = @create_values.merge(password: '!Password1')
    end
    context "with valid params" do
      it "creates a new Admin in DB" do
        expect {
          do_post(:create,true,{:admin => @create_params})
        }.to change(User, :count).by(1)
      end
      it "all the passed attribs are save as part of admin" do
        do_post(:create,true,{:admin => @create_params})
        expect(@body).to contain_values_of(@create_values)
      end
    end
    context "with invalid params" do
      it "assigns a newly created but unsaved admin as @admin" do
        @create_params.delete(:email)
        do_post(:create,false,{:admin => @create_params})
        error = {"errors"=>{"email"=>["can't be blank"]}}
        expect(@body).to eq(error)
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      before :each do
        @new_name = 'irish'
        @update_params = {:last_name => @new_name}
      end   
      it "updates the admin with attributes" do
        do_put(:update,true,{:id => @admin1.to_param, :admin => @update_params})
        expect(@body['last_name']).to eq(@new_name)
      end
      it "does not change the other attributes" do
        do_put(:update,true,{:id => @admin1.to_param, :admin => @update_params})
        expect(@body['first_name']).to eq(@admin1.first_name)
      end
    end
    context "with invalid params" do
      before :each do
        @update_params = {:email => ''}
      end   
      it "returns an error message" do
        do_put(:update,false,{:id => @admin1.to_param, :admin => @update_params})
        error = {"errors"=>{"email"=>["can't be blank"]}}
        expect(@body).to eq(error)
      end
      it "does not change the db record" do
        original_mail = @admin1.email
        do_put(:update,false,{:id => @admin1.to_param, :admin => @update_params})
        expect(@admin1.reload.email).to eq(original_mail)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested admin" do
      expect {
        do_delete(:destroy,true,{:id => @admin1.to_param})
      }.to change(User, :count).by(-1)
    end
    it "but returns the original object" do
      do_delete(:destroy,true,{:id => @admin1.to_param})
      expect(@body).to eq(@values1.as_json)
    end
  end

end
