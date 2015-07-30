class A1::JobsController < A1::BaseController
    
  def index
    trace "*** job index. params=#{params}"
    trace "--- current_user   = #{current_user}"
    trace "--- current_agency = #{current_agency}"
    @jobs = current_agency.jobs.to_a
    trace "--- jobs count = #{@jobs.length}"
  end

  def create
    values = job_params.merge(agency_id: current_user.agency.id)
    trace "*** job create params=#{params}"
    trace "*** job create values=#{values}"
    job = Job.create(values)
    job.requested_at = Time.zone.now
    job.status = :new
    if job.save
      trace "--- save worked. job=#{filter(job)}"
      render :json => filter(job), :status => 200
    else
      trace "--- save failed. error[0] = #{job.errors.full_messages[0]}"
      render :json => { :errors => job.errors }, :status => 422
    end
  end

  def show
    job = Job.find(params[:id])
    trace "*** job#show: job=#{filter(job)}"
    respond_with(filter(job))
  end

  def update
    trace "*** job update. job_params=#{job_params}"
    job = Job.find(params[:id])
    job.update(job_params)
    if job.save
      trace "--- save worked. job=#{filter(job)}"
      render :json => filter(job), :status => 200
    else
      render :json => { :errors => job.errors }, :status => 422
    end    
  end
  
  def destroy
    trace "*** job destroy. id=#{params[:id]}"
    job = Job.find(params[:id])
    job.destroy!
    render :json => filter(job), :status => 200
  end

  private
  
  def filter_attribs(job)
    # this method is called by the api_controller::filter in the respond to control which attributes are returned
    job.slice("id","status","customer_id","description","starts_at","start_time","duration","repeat_style")      
  end  
  
  def job_params
    params.require(:job).permit(:customer_id, :description, :starts_at, :start_time, :duration, :repeat_style)
  end  
  
end
