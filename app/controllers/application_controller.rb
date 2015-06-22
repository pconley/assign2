class ApplicationController < ActionController::Base
  
  protect_from_forgery

  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end
  
  respond_to :json
    
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  def angular
    render 'layouts/application'
  end

  private
  
  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :username
  end
  
  def trace(s)
    puts s
  end
  
end
