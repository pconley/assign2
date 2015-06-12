class AddAgencyTable < ActiveRecord::Migration
  def change
    create_table :agencies do |t|
      t.string  :agency_name, null: false
      t.string  :status
      t.boolean :active
      t.string  :logo
      t.string  :contact_name
      t.string  :contact_phone
      t.string  :contact_email
      t.timestamps null: false
    end    
  end
end
