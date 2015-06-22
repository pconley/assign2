class ApiController < ApplicationController
  
  respond_to :json
              
  private
                               
  def filter(arg)
    # this funcation assumes that the controller has implemented
    # a filter_attribs method the defines the attributes to send
    # puts "*** arg = #{arg}"
    if arg.instance_of? Array
      arg.map { |d| filter_attribs(d) }
    else
      # puts "*** singleton"
      filter_attribs(arg)
    end
  end
        
end