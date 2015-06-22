class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
           
  belongs_to :agency
  
  scope :with_role, ->(role) { where(role: role) }  
  
  def interpreter?
    role == 'interpreter'
  end
  def requester?
    role == 'requester'
  end
  def consumer?
    role == 'consumer'
  end
  def admin?
    role == 'admin'
  end
  
  def to_s 
    label = role ? role.capitalize : 'User'
    "<#{label}#{id} #{email}>"
  end
  
end
