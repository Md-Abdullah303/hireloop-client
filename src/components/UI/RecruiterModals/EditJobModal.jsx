"use client";

import { useState } from "react";
import {
  ArrowUpFromSquare,
  Briefcase,
  ChevronDown,
  Envelope,
  Globe,
  PaperPlane,
  Pencil,
} from "@gravity-ui/icons";
import {
  Button,
  Description,
  Dropdown,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  Modal,
  Surface,
  TextArea,
  TextField,
} from "@heroui/react";
import { editJob } from "@/lib/actions/jobs";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function EditJobModal({ companyJob }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // ড্রপডাউন এবং রিমোট টগলের জন্য ডিফল্ট স্টেট
  const [jobType, setJobType] = useState(companyJob?.jobType || "Full-time");
  const [currency, setCurrency] = useState(companyJob?.currency || "USD");
  const [isRemote, setIsRemote] = useState(companyJob?.isRemote || false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const editedData = {
      jobTitle: formData.get("jobTitle"),
      jobCategory: formData.get("jobCategory"),
      jobType: jobType,
      salaryMin: Number(formData.get("salaryMin")),
      salaryMax: Number(formData.get("salaryMax")),
      currency: currency,
      isRemote: isRemote,
      city: isRemote ? "" : formData.get("city"),
      country: isRemote ? "" : formData.get("country"),
      applicationDeadline: formData.get("applicationDeadline"),
      responsibilities: formData.get("responsibilities"),
      requirements: formData.get("requirements"),
      benefits: formData.get("benefits"),
    };

    const res = await editJob(companyJob._id, editedData);

    if (res.modifiedCount > 0) {
      router.refresh();
      toast("Job Updated");
      setIsOpen(false);
    }
  };

  const inputBorderClass =
    "border border-zinc-700 focus-within:border-zinc-500 rounded-lg bg-zinc-900/50";

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        className="rounded-full"
        variant="ghost"
        onPress={() => setIsOpen(true)}
      >
        <Pencil />
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-3xl max-h-[90vh] flex flex-col  border border-zinc-800">
            <Modal.CloseTrigger />
            <Modal.Header>
              <ArrowUpFromSquare />
              <Modal.Heading>Edit Job Details</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <Surface variant="default">
                <form onSubmit={handleSubmit}>
                  <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Job Title */}
                    <TextField
                      isRequired
                      name="jobTitle"
                      className="md:col-span-2"
                      defaultValue={companyJob?.jobTitle}
                    >
                      <Label>Job Title</Label>
                      <Input
                        placeholder="e.g. Senior Product Designer"
                        className={inputBorderClass}
                      />
                      <FieldError />
                    </TextField>

                    {/* Job Category */}
                    <TextField
                      isRequired
                      name="jobCategory"
                      defaultValue={companyJob?.jobCategory}
                    >
                      <Label>Job Category</Label>
                      <Input
                        placeholder="e.g. Design, Engineering, Marketing"
                        className={inputBorderClass}
                      />
                      <FieldError />
                    </TextField>

                    {/* Job Type Dropdown */}
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-sm font-medium">Job Type</Label>
                      <Dropdown>
                        <Button
                          aria-label="Job Type Dropdown"
                          variant="secondary"
                          className="w-full justify-between bg-[#18181b] border border-zinc-700 hover:bg-[#27272a] h-10 text-zinc-200"
                        >
                          {jobType}
                          <ChevronDown className="size-4 text-zinc-500" />
                        </Button>
                        <Dropdown.Popover className="bg-[#18181b] border border-zinc-700">
                          <Dropdown.Menu
                            onAction={(key) => setJobType(String(key))}
                          >
                            {[
                              "Full-time",
                              "Part-time",
                              "Contract",
                              "Internship",
                            ].map((type) => (
                              <Dropdown.Item
                                key={type}
                                id={type}
                                textValue={type}
                                className="text-zinc-300 hover:bg-[#27272a]"
                              >
                                <Label>{type}</Label>
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </div>

                    {/* Salary Breakdown Block */}
                    <div className="grid grid-cols-3 gap-3 md:col-span-2 items-end">
                      {/* Minimum Salary */}
                      <TextField
                        isRequired
                        name="salaryMin"
                        type="number"
                        defaultValue={companyJob?.salaryMin}
                      >
                        <Label>Minimum Salary</Label>
                        <Input
                          placeholder="45000"
                          min={0}
                          className={inputBorderClass}
                        />
                        <FieldError />
                      </TextField>

                      {/* Maximum Salary */}
                      <TextField
                        isRequired
                        name="salaryMax"
                        type="number"
                        defaultValue={companyJob?.salaryMax}
                      >
                        <Label>Maximum Salary</Label>
                        <Input
                          placeholder="85000"
                          min={0}
                          className={inputBorderClass}
                        />
                        <FieldError />
                      </TextField>

                      {/* Currency Selector */}
                      <div className="flex flex-col gap-1.5">
                        <Label className="text-sm font-medium">Currency</Label>
                        <Dropdown>
                          <Button
                            aria-label="Currency Menu"
                            variant="secondary"
                            className="w-full justify-between bg-[#18181b] border border-zinc-700 hover:bg-[#27272a] h-10 text-zinc-200"
                          >
                            {currency}
                            <ChevronDown className="size-4 text-zinc-500" />
                          </Button>
                          <Dropdown.Popover className="bg-[#18181b] border border-zinc-700">
                            <Dropdown.Menu
                              onAction={(key) => setCurrency(String(key))}
                            >
                              {["USD", "EUR", "GBP", "BDT", "CAD"].map(
                                (curr) => (
                                  <Dropdown.Item
                                    key={curr}
                                    id={curr}
                                    textValue={curr}
                                    className="text-zinc-300 hover:bg-[#27272a]"
                                  >
                                    <Label>{curr}</Label>
                                  </Dropdown.Item>
                                ),
                              )}
                            </Dropdown.Menu>
                          </Dropdown.Popover>
                        </Dropdown>
                      </div>
                    </div>

                    {/* Location block */}
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-center justify-between p-3 bg-[#18181b]/50 border border-zinc-700 rounded-xl">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-white">
                            Remote Position
                          </span>
                          <span className="text-xs text-zinc-400">
                            This role can be fulfilled outside geographical
                            dependencies.
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant={isRemote ? "primary" : "secondary"}
                          onPress={() => setIsRemote(!isRemote)}
                          className="w-24 text-xs font-semibold border border-zinc-700"
                        >
                          {isRemote ? "Remote On" : "Remote Off"}
                        </Button>
                      </div>

                      {!isRemote && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <TextField
                            isRequired={!isRemote}
                            name="city"
                            defaultValue={companyJob?.city}
                          >
                            <Label>City</Label>
                            <Input
                              placeholder="San Francisco"
                              className={inputBorderClass}
                            />
                            <FieldError />
                          </TextField>
                          <TextField
                            isRequired={!isRemote}
                            name="country"
                            defaultValue={companyJob?.country}
                          >
                            <Label>Country</Label>
                            <Input
                              placeholder="United States"
                              className={inputBorderClass}
                            />
                            <FieldError />
                          </TextField>
                        </div>
                      )}
                    </div>

                    {/* Application Deadline */}
                    <TextField
                      isRequired
                      name="applicationDeadline"
                      type="date"
                      className="md:col-span-2"
                      defaultValue={companyJob?.applicationDeadline}
                    >
                      <Label>Application Deadline</Label>
                      <Input
                        type="date"
                        className={`w-full text-zinc-300 ${inputBorderClass}`}
                      />
                      <FieldError />
                    </TextField>
                  </FieldGroup>

                  <hr className="border-zinc-800 my-6" />

                  {/* Descriptions & Details */}
                  <Fieldset>
                    <Fieldset.Legend className="text-xl font-bold tracking-tight text-white flex items-center gap-2 mb-1">
                      <Globe className="size-5 text-zinc-400" />
                      Job Description
                    </Fieldset.Legend>
                    <Description className="text-zinc-400 mb-6 text-sm">
                      Deeply define expectations and responsibilities associated
                      with the role.
                    </Description>

                    <FieldGroup className="space-y-6">
                      {/* Responsibilities */}
                      <TextField
                        isRequired
                        name="responsibilities"
                        defaultValue={companyJob?.responsibilities}
                        validate={(v) =>
                          v.length < 20
                            ? "Please outline responsibilities thoroughly (min 20 characters)."
                            : null
                        }
                      >
                        <Label>Responsibilities</Label>
                        <TextArea
                          placeholder="Outline day-to-day work parameters and technical projects..."
                          className={inputBorderClass}
                        />
                        <Description>Minimum 20 characters</Description>
                        <FieldError />
                      </TextField>

                      {/* Requirements */}
                      <TextField
                        isRequired
                        name="requirements"
                        defaultValue={companyJob?.requirements}
                        validate={(v) =>
                          v.length < 20
                            ? "Please outline specific expectations/requirements."
                            : null
                        }
                      >
                        <Label>Requirements</Label>
                        <TextArea
                          placeholder="Outline expected skillsets, tools, certifications, or workflows..."
                          className={inputBorderClass}
                        />
                        <Description>Minimum 20 characters</Description>
                        <FieldError />
                      </TextField>

                      {/* Benefits */}
                      <TextField
                        name="benefits"
                        defaultValue={companyJob?.benefits}
                      >
                        <Label>
                          Benefits{" "}
                          <span className="text-zinc-500 font-normal text-xs">
                            (Optional)
                          </span>
                        </Label>
                        <TextArea
                          placeholder="List health benefits, equity options, wellness allocations, offsites..."
                          className={inputBorderClass}
                        />
                        <FieldError />
                      </TextField>
                    </FieldGroup>

                    <Fieldset.Actions className="pt-6 border-t border-zinc-800 flex items-center justify-end gap-3 mt-6">
                      <Button
                        type="reset"
                        variant="secondary"
                        onPress={() => setIsOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="primary" className="px-6">
                        <PaperPlane className="size-4" />
                        Publish Job Listing
                      </Button>
                    </Fieldset.Actions>
                  </Fieldset>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
