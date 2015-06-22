require 'devise'

Dir[File.dirname(__FILE__) + "/support/**/*.rb"].each {|f| require f}

RSpec.configure do |config|
  
  config.include Devise::TestHelpers, type: :request
  config.include Devise::TestHelpers, type: :controller  

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

end
  
  def api_params(params={})
    params[:format] = :json
    params
  end
  def do_get(action,expected,params,valid_session={})
    execute(expected) do
      get action, api_params(params), valid_session
    end
  end
  
  def do_post(action,expected,params,valid_session={})
    execute(expected) do
      post action, api_params(params), valid_session
    end
  end
  
  def do_put(action,expected,params,valid_session={})
    execute(expected) do
      put action, api_params(params), valid_session
    end
  end
  
  def do_delete(action,expected,params,valid_session={})
    execute(expected) do
      put action, api_params(params), valid_session
    end
  end
  
  def execute(expected)
    yield # to the actual call
    # puts "+++ response.body = #{@response.body.inspect}"    
    expect(response).to be_success if expected
    @body = JSON.parse(response.body) 
    # puts "+++ body = #{@body}"
  end
   
  def is_subset(hash1, hash2)
    # a specialized method to compare objects as they
    # are returned by the api... mixes strings and syms
    # returns true if hash1 is subset of hash2
    hash1.keys.each do |key|
      return false unless hash2.has_key? key.to_s
      return false unless hash1[key] == hash2[key.to_s].to_s    
    end
    return true # no missing key or unequal values
  end
  

