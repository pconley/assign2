class Job < ActiveRecord::Base
    
  validates :status,       :presence => true
  validates :agency_id,    :presence => true
  # validates :consumer_id,  :presence => true
  validates :customer_id,  :presence => true
  validates :description,  :presence => true
  validates :starts_at,    :presence => true
  validates :start_time,   :presence => true
  validates :duration,     :presence => true, numericality: { only_integer: true }  
  validates :requested_at, :presence => true
  
  belongs_to :agency
  belongs_to :customer  
  belongs_to :created,     :class_name => "User", :foreign_key => "created_id"
  belongs_to :updated,     :class_name => "User", :foreign_key => "updated_id"
  # belongs_to :consumer,    :class_name => "User", :foreign_key => "consumer_id"
  belongs_to :interpreter, :class_name => "User", :foreign_key => "interpreter_id"
  
  scope :open,     -> { where(interpreter_id: nil) }  
  scope :assigned, -> { where.not(interpreter_id: nil) }  

  scope :before, ->(date) { where("starts_at < ?", date.beginning_of_day) }
  scope :after,  ->(date) { where("starts_at > ?", date.end_of_day) }
  scope :on_day, ->(date) { where(starts_at: date.beginning_of_day..date.end_of_day) }
  
  scope :past, -> { before(Time.zone.now.to_date) }
  scope :today, -> { on_day(Time.zone.now.to_date) }
  scope :future, -> { after(Time.zone.now.to_date) }
  
  attr_accessor :duration_string
      
  # before_save :clean_up_data
  # def clean_up_data
  #   # strip off any time in the starts_at field
  #   self.starts_at = self.starts_at.to_date
  # end
  
  def state
    return :past  if starts_at.to_date < Time.zone.now.to_date
    return :open unless interpreter
    return :today if starts_at.to_date == Time.zone.now.to_date
    :pending # future
  end    
    
  def when
    date_string = starts_today? ? 'Today' : starts_at.strftime('%a %-m/%-d')
    "#{date_string} @ #{start_time.strftime('%l:%M %P')} for #{duration_string}"
  end
  
  def starts_today?
    Time.zone.now.to_date == starts_at.to_date
  end
  
  def duration_string
    case duration
      when 60 
        '1 hour'
      when 120
        '2 hours'
      else
        "#{duration} mins"
      end
  end
  
  def to_s
    "<Job#{id} #{description[0..20]}>"
  end
  
  def print
    puts "Job##{id}"
    puts "-----------------"
    # puts "  agency: #{agency.agency_name}"
    puts "  description: #{description}"
    puts "  interpreter: #{interpreter}"
    puts "  starts at  : #{starts_at}"
    puts ""
  end

end
