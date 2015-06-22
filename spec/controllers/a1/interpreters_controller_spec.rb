require 'rails_helper'

RSpec.describe A1::InterpretersController, type: :controller do
  
  before :each do
    @user = FactoryGirl.create(:admin)
    sign_in @user
    @interpreter1 = FactoryGirl.create(:interpreter, agency: @user.agency)
    @interpreter2 = FactoryGirl.create(:interpreter, agency: @user.agency)
  end
  
  def values(interpreter)
    fields =%w(id email username default_payrate last_name first_name middle_name title prefix suffix gender) 
    interpreter.slice(*fields)     
  end  
  
  describe "GET #index" do
    it "returns the set of interpreters" do
      do_get(:index, true, {})
      expect(@body.length).to eq(2)
      expect(@body[0]).to contain_values_of(values(@interpreter1))
      expect(@body[1]).to contain_values_of(values(@interpreter2))
    end
  end

  describe "GET #show" do
    it "interpreter as json object" do
      do_get(:show,true,{:id => @interpreter1.to_param})
      expect(@body).to contain_values_of(values(@interpreter1))
    end
  end

  describe "POST #create" do
    before :each do
      @create_params = FactoryGirl.attributes_for(:interpreter, agency: nil)
      @create_params.delete(:role) # not just nil... remove the param
      @create_params.delete(:agency) # not just nil... remove the param
      # puts "+++ create params = #{@create_params}"
    end
    context "with valid params" do
      it "creates a new user in DB" do
        expect {
          do_post(:create,true,{:user => @create_params})
        }.to change(User, :count).by(1)
      end
      it "all the passed attribs are save as part of interpreter" do
        do_post(:create,true,{:user => @create_params})
        # puts "+++ create params = #{@create_params}"
        # puts "+++ result body = #{@body}"
        @create_params.delete(:password) # is not returned
        expect(@body).to contain_values_of(@create_params)
      end
      it "has a role of interpreter" do
        do_post(:create,true,{:user => @create_params})
        user = User.find_by_id(@body['id'])
        expect(user).to be_interpreter
      end
    end
    context "with invalid params" do
      it "returns an error message" do
        @create_params.delete(:email)
        do_post(:create,false,{:user => @create_params})
        error = {"errors"=>{"email"=>["can't be blank"]}}
        expect(@body).to eq(error)
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      before :each do
        @new_mail = 'newmail@testspec.com'
        @update_params = {:email => @new_mail}
      end   
      it "updates the interpreter with attributes" do
        do_put(:update,true,{:id => @interpreter1.to_param, :user => @update_params})
        expect(@body['email']).to eq(@new_mail)
      end
      it "does not change the other attributes" do
        do_put(:update,true,{:id => @interpreter1.to_param, :user => @update_params})
        expect(@body['username']).to eq(@interpreter1.username)
      end
    end
    context "with invalid params" do
      before :each do
        @update_params = {:email => ''}
      end   
      it "returns an error message" do
        do_put(:update,false,{:id => @interpreter1.to_param, :user => @update_params})
        error = {"errors"=>{"email"=>["can't be blank"]}}
        expect(@body).to eq(error)
      end
      it "does not change the db record" do
        original_email = @interpreter1.email
        do_put(:update,false,{:id => @interpreter1.to_param, :user => @update_params})
        expect(@interpreter1.reload.email).to eq(original_email)
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested interpreter" do
      expect {
        do_delete(:destroy,true,{:id => @interpreter1.to_param})
      }.to change(User, :count).by(-1)
    end
    it "but returns the original object" do
      do_delete(:destroy,true,{:id => @interpreter1.to_param})
      expect(@body).to eq(values(@interpreter1))
    end
  end

end
