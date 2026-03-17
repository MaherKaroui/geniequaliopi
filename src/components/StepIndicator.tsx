import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const StepIndicator = ({ steps, currentStep, onStepClick }: StepIndicatorProps) => {
  return (
    <div className="flex items-center justify-center gap-1 mb-8">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <button
            onClick={() => onStepClick(step.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all text-sm font-medium
              ${currentStep === step.id
                ? "bg-primary text-primary-foreground shadow-elevated"
                : currentStep > step.id
                  ? "bg-qualiopi-green-light text-qualiopi-green cursor-pointer hover:bg-qualiopi-green/10"
                  : "bg-secondary text-muted-foreground cursor-pointer hover:bg-secondary/80"
              }`}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
              ${currentStep === step.id
                ? "bg-primary-foreground/20"
                : currentStep > step.id
                  ? "bg-qualiopi-green text-primary-foreground"
                  : "bg-muted"
              }`}>
              {currentStep > step.id ? <Check className="w-3.5 h-3.5" /> : step.id}
            </span>
            <span className="hidden md:inline">{step.label}</span>
          </button>
          {index < steps.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 rounded ${currentStep > step.id ? "bg-qualiopi-green" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
