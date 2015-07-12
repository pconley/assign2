class A1::AdminsController < A1::UsersController
  
  def role
    :admin
  end
  
  private
  
  def response_attribs
    # defines the set of outgoing attributes that are returned in the json responses
    base_response_attribs + %w(title prefix suffix)
  end
    
  def permitted_params
    # defines the set of incoming parameters that are required for a create or update
    base_permitted_params + %i(title prefix suffix)
  end
    
end
