class Customer < ActiveRecord::Base
    
  validates :company_name,  :presence => true, uniqueness: true
  validates :contact_name,  :presence => true
  # validates :contact_email, :presence => true
  # validates :contact_phone, :presence => true
  
  # has_one  :address, :as => :addressable
  # has_many :phones,  :as => :phoneable
  # has_many :jobs
  
  belongs_to :agency
  
  # has_many :requesters, foreign_key: "customer_id", class_name: "User"
  
  def to_s
    "<Customer#{id} #{company_name}>"
  end
     
end
