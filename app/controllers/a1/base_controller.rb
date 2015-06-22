class A1::BaseController < ApiController

  before_action :authenticate_admin!
  
  private

  def authenticate_admin!
    # trace "authenticate_admin! current_user=#{current_user}"
    # redirect_to root_path unless current_user.try(:admin?)
    head :unauthorized unless current_user.try(:admin?)
  end

  def after_sign_in_path_for(resource)
    resource.admin? ? a1_dashboard_path : root_path
  end
    
  helper_method :current_agency
  def current_agency
    current_user.try(:agency)
  end

end