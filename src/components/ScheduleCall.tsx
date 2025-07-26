import React from 'react';

const ScheduleCall: React.FC = () => {
  const handleScheduleCall = () => {
    // Open Calendly or your preferred scheduling tool
    window.open('https://calendly.com/nitinrahane', '_blank');
  };

  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 rounded-xl p-8 text-white shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3">Ready to Grow Your Business?</h3>
          <p className="text-primary-100 text-lg leading-relaxed">
            Let's discuss your project requirements and explore how I can help you achieve your goals. 
            Book a free consultation call to get started.
          </p>
          <div className="flex items-center gap-4 mt-4 text-primary-100">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free Consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>30 Min Call</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleScheduleCall}
            className="bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Schedule a Call
          </button>
          <div className="text-center text-primary-100 text-sm">
            Available Mon-Fri, 9 AM - 6 PM IST
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCall;
