class A1::InterpretersController < A1::UsersController
  
  def role
    :interpreter
  end
  
  private
  
  def response_attribs
    # defines the set of outgoing attributes that are returned in the json responses
    base_response_attribs + %w(gender default_payrate)
  end
    
  def permitted_params
    # defines the set of incoming parameters that are required for a create or update
    base_permitted_params + %i(gender default_payrate)
  end
      
end
