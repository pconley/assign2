class ModifyUserTable < ActiveRecord::Migration
  def change
    add_column    :users, :role,  :string
    add_reference :users, :agency, index: true, foreign_key: true
    
    add_column    :users, :default_payrate, :integer
    
    add_column    :users, :last_name, :string
    add_column    :users, :first_name, :string
    add_column    :users, :middle_name, :string
    add_column    :users, :title, :string
    add_column    :users, :prefix, :string
    add_column    :users, :suffix, :string
    add_column    :users, :gender, :string 
  end
end
