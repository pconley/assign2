require 'colorize'
require 'factory_girl'

namespace :db do
    
  desc "Create sample data for use in development" 
  task :repopulate => :environment do
    agencies = [
      { agency_name: "AAA Services", code: "aaa" },
      { agency_name: "BBB Be Better", code: "bbb" }
    ]
    puts "\nClear Database"
    User.destroy_all
    Agency.destroy_all
    Customer.destroy_all
    
    puts "\nPopulate Agencies with people"
    agencies.each do |params| 
      code = params[:code]
      params.delete(:code)
      agency = Agency.create(params)
      puts "Created: #{agency}".blue
      people = %w(admin pat dan jim ted tim claire mj)
      people.each do |name|
        role = 'admin'
        username = "#{name}-#{code}"
        email = "#{name}@#{code}.com"
        x = FactoryGirl.create(role, username: username, email: email, agency: agency)
        puts "-- #{x}"
      end
      
      for i in 0..10 # customers
         x = FactoryGirl.create(:customer, agency: agency)
         puts "-- #{x}"
         # for j in 0..2
         #   r = x.requesters << FactoryGirl.create(:user, agency: agency, roles: [:requestor])
         #   puts "---- requestor: #{r}"
         # end
       end
       for i in 0..15 # interpreters
         x = FactoryGirl.create(:interpreter, agency: agency)
         puts "-- #{x}"
       end
    #   for i in 0..9 # consumers
    #      x = FactoryGirl.create(:consumer, agency: agency)
    #      puts "-- consumer: #{x} #{x.address}"
    #   end
    #   for i in 0..40 # jobs
    #     consumer = agency.consumers.sample
    #     customer = agency.customers.sample
    #     interpreter = ([nil]+agency.interpreters.to_a).sample
    #     FactoryGirl.create(:job, agency: agency, customer: customer, consumer: consumer, interpreter: interpreter)
    #   end
      
    #   
    end
    puts "\n"
    Agency.all.each do |agency|
      puts "#{agency.agency_name}".blue
      puts "#{agency.customers.count} customers"
      puts "#{agency.interpreters.count} interpreters"
      # puts "#{agency.consumers.count} consumers"
      puts "#{agency.admins.count} admins"
      puts "#{agency.users.count} agency users"
      # puts "#{agency.jobs.count} agency jobs"
      # puts "\n"  
    end
    # puts "#{Address.count} total addresses"
    # puts "#{Phone.count} total phones"
    puts "#{User.count} total users"
    # puts "#{Job.count} total jobs"
  end 
  
end