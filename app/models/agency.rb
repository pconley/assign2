class Agency < ActiveRecord::Base
    
  validates :agency_name, :presence => true, uniqueness: true
  
  has_many :customers,    :dependent => :delete_all
  has_many :users,        :dependent => :delete_all
  # has_many :jobs,         :dependent => :delete_all
      
  def to_s
    "<Agency#{id} #{agency_name}>"
  end
   
  # def admins
  #   users.with_role(:admin)
  # end
  # def consumers
  #   users.with_role(:consumer)
  # end
  # def interpreters
  #   users.with_role(:interpreter)
  # end
    
end
