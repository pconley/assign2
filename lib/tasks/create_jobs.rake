require 'colorize'
require 'factory_girl'

namespace :db do
    
  desc "Create jobs for each agnecy" 
  task :create_jobs => :environment do
    puts "\nClear Job Table"
    Job.destroy_all
    puts "\nPopulate Agencies with jobs"
    Agency.all.each do |agency| 
      puts "Agency: #{agency.agency_name}".blue
      jobs_data = [{},{},{},{},{},{},{},{}]
      jobs_data.each do |job_data|
        x = FactoryGirl.create(:job_with_interpreter, agency: agency)
        x.print
      end
      
    end
    puts "\n"
    Agency.all.each do |agency|
      puts "#{agency.jobs} jobs for #{agency.agency_name}".blue
    end
    puts "#{Job.count} total jobs"
  end 
  
end