class AddCustomersTable < ActiveRecord::Migration
  def change
    create_table :customers do |t|
      t.integer :agency_id, null: false
      t.string  :company_name
      t.string  :contact_name
      t.string  :contact_email
      t.string  :contact_phone
      t.string  :billing_email
      t.integer :billing_rate
      t.timestamps null: false
    end
  end
end
