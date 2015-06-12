class ModifyUserTable < ActiveRecord::Migration
  def change
    add_column    :users, :role, :string
    add_reference :users, :agency, index: true, foreign_key: true   
  end
end
