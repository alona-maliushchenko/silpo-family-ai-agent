interface StepperProps {
    currentStep: number;
    steps: string[];
  }
  
  export function Stepper({
    currentStep,
    steps,
  }: StepperProps) {
    return (
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const active = stepNumber === currentStep;
          const completed = stepNumber < currentStep;
  
          return (
            <div key={step} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  active || completed
                    ? "bg-[#ff6b00] text-white"
                    : "bg-[#eeeeee] text-[#777]"
                }`}
              >
                {completed ? "✓" : stepNumber}
              </div>
  
              <span
                className={`hidden text-xs sm:block ${
                  active
                    ? "font-semibold text-[#222]"
                    : "text-[#888]"
                }`}
              >
                {step}
              </span>
  
              {index < steps.length - 1 && (
                <div className="h-px w-8 bg-[#ddd]" />
              )}
            </div>
          );
        })}
      </div>
    );
  }