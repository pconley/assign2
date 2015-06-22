require "rails_helper"

RSpec.describe A1::CustomersController, type: :routing do
  describe "routing" do
    it "routes to action" do
      expect(:get => "/a1/customers").to route_to("a1/customers#index")
      expect(:get => "/a1/customers/1").to route_to("a1/customers#show", :id => "1")
      expect(:post => "/a1/customers").to route_to("a1/customers#create")
      expect(:put => "/a1/customers/1").to route_to("a1/customers#update", :id => "1")
      expect(:delete => "/a1/customers/1").to route_to("a1/customers#destroy", :id => "1")
    end
  end
end

RSpec.describe A1::InterpretersController, type: :routing do
  describe "routing" do
    it "routes to action" do
      expect(:get => "/a1/interpreters").to route_to("a1/interpreters#index")
      expect(:get => "/a1/interpreters/1").to route_to("a1/interpreters#show", :id => "1")
      expect(:post => "/a1/interpreters").to route_to("a1/interpreters#create")
      expect(:put => "/a1/interpreters/1").to route_to("a1/interpreters#update", :id => "1")
      expect(:delete => "/a1/interpreters/1").to route_to("a1/interpreters#destroy", :id => "1")
    end
  end
end
