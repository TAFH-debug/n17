"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { axiosInstance } from "@/lib/utils";
import { useState } from "react";
import { toast } from "react-toastify";

interface Applicant {
    fullName: string;
    email: string;
    birthDate: string;
    phoneNumber: string;
    programmingSkillLevel: string;
    cv: string;
    willingToParticipateOnPaidBasis: string;
    telegramHandle: string;
    linkedInLink: string;
    socialMediaLinks: string;
    gitHubHandle: string;
    educationalPlacement: string;
    specialtyAtUniversity: string;
    jobPlacement: string;
    programmingExperienceDescription: string;
    pastProgrammingProjects: string;
    bestAchievements: string;
    availabilityInAlmaty: string;
    needAccommodationInAlmaty: string;
    representativeGroups: string;
}

export default function Page() {
    const [url, setUrl] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const [github, setGithub] = useState<string>("");
    const [branch, setBranch] = useState("");
    const [repoCheck, setRepoCheck] = useState("");

    const [applicant, setApplicant] = useState<Applicant>({
        fullName: "A",
        email: "B",
        birthDate: "C",
        phoneNumber: "D",
        programmingSkillLevel: "E",
        cv: "F",
        willingToParticipateOnPaidBasis: "G",
        telegramHandle: "H",
        linkedInLink: "I",
        socialMediaLinks: "J",
        gitHubHandle: "K",
        educationalPlacement: "L",
        specialtyAtUniversity: "M",
        jobPlacement: "N",
        programmingExperienceDescription: "O",
        pastProgrammingProjects: "P",
        bestAchievements: "Q",
        availabilityInAlmaty: "R",
        needAccommodationInAlmaty: "S",
        representativeGroups: "T",
    });


    const testData = () => {
        setApplicant({
            fullName: "None",
            email: "None",
            birthDate: "None",
            phoneNumber: "None",
            programmingSkillLevel: "A",
            cv: "None",
            willingToParticipateOnPaidBasis: "None",
            telegramHandle: "B",
            linkedInLink: "None",
            socialMediaLinks: "C",
            gitHubHandle: "D",
            educationalPlacement: "E",
            specialtyAtUniversity: "F",
            jobPlacement: "G",
            programmingExperienceDescription: "H",
            pastProgrammingProjects: "I",
            bestAchievements: "J",
            availabilityInAlmaty: "K",
            needAccommodationInAlmaty: "None",
            representativeGroups: "None",
        })
    }
    const sendData = async () => {
        const markers = {
            "full_name": applicant.fullName === "None" ? undefined : (applicant.fullName.charCodeAt(0) - 65),
            "email": applicant.email === "None" ? undefined : (applicant.email.charCodeAt(0) - 65),
            "birth_date": applicant.birthDate === "None" ? undefined : (applicant.birthDate.charCodeAt(0) - 65),
            "phone_number": applicant.phoneNumber === "None" ? undefined : (applicant.phoneNumber.charCodeAt(0) - 65),
            "programming_skill_level": applicant.programmingSkillLevel === "None" ? undefined : (applicant.programmingSkillLevel.charCodeAt(0) - 65),
            "cv": applicant.cv === "None" ? undefined : (applicant.cv.charCodeAt(0) - 65),
            "on_paid_basis": applicant.willingToParticipateOnPaidBasis === "None" ? undefined : (applicant.willingToParticipateOnPaidBasis.charCodeAt(0) - 65),
            "telegram_handle": applicant.telegramHandle === "None" ? undefined : (applicant.telegramHandle.charCodeAt(0) - 65),
            "linkedin_link": applicant.linkedInLink === "None" ? undefined : (applicant.linkedInLink.charCodeAt(0) - 65),
            "socialmedia_links": applicant.socialMediaLinks === "None" ? undefined : (applicant.socialMediaLinks.charCodeAt(0) - 65),
            "github_handle": applicant.gitHubHandle === "None" ? undefined : (applicant.gitHubHandle.charCodeAt(0) - 65),
            "educational_placement": applicant.educationalPlacement === "None" ? undefined : (applicant.educationalPlacement.charCodeAt(0) - 65),
            "specialty_at_university": applicant.specialtyAtUniversity === "None" ? undefined : (applicant.specialtyAtUniversity.charCodeAt(0) - 65),
            "job_placement": applicant.jobPlacement === "None" ? undefined : (applicant.jobPlacement.charCodeAt(0) - 65),
            "programming_experience": applicant.programmingExperienceDescription === "None" ? undefined : (applicant.programmingExperienceDescription.charCodeAt(0) - 65),
            "past_projects": applicant.pastProgrammingProjects === "None" ? undefined : (applicant.pastProgrammingProjects.charCodeAt(0) - 65),
            "achievements": applicant.bestAchievements === "None" ? undefined : (applicant.bestAchievements.charCodeAt(0) - 65),
            "availability_in_almaty": applicant.availabilityInAlmaty === "None" ? undefined : (applicant.availabilityInAlmaty.charCodeAt(0) - 65),
            "need_accommodation_in_almaty": applicant.needAccommodationInAlmaty === "None" ? undefined : (applicant.needAccommodationInAlmaty.charCodeAt(0) - 65),
            "representative_groups": applicant.representativeGroups === "None" ? undefined : (applicant.representativeGroups.charCodeAt(0) - 65),
        }
        const data = {
            table_url: url,
            markers,
            applicants_count: count
        };

        const id = toast.info("Processing...", {
            autoClose: false
        })
        const res = await axiosInstance.post("/excel/", data);

        toast.dismiss(id);
        toast.success(`Excel table successfully updated. ${res.data.result} students checked.`)
    }

    const githubCheck = async () => {
        const res = await axiosInstance.post("/github/", {
            link: github,
            branch
        })

        if (res.data.answer === "YES") {
            toast.success("Not cheated." + res.data.reason)
        }
        else {
            toast.error("Suspicious repository." + res.data.reason)
        }
    }

    const feedback = async () => {
        const markers = {
            "full_name": applicant.fullName === "None" ? undefined : (applicant.fullName.charCodeAt(0) - 65),
            "email": applicant.email === "None" ? undefined : (applicant.email.charCodeAt(0) - 65),
            "birth_date": applicant.birthDate === "None" ? undefined : (applicant.birthDate.charCodeAt(0) - 65),
            "phone_number": applicant.phoneNumber === "None" ? undefined : (applicant.phoneNumber.charCodeAt(0) - 65),
            "programming_skill_level": applicant.programmingSkillLevel === "None" ? undefined : (applicant.programmingSkillLevel.charCodeAt(0) - 65),
            "cv": applicant.cv === "None" ? undefined : (applicant.cv.charCodeAt(0) - 65),
            "on_paid_basis": applicant.willingToParticipateOnPaidBasis === "None" ? undefined : (applicant.willingToParticipateOnPaidBasis.charCodeAt(0) - 65),
            "telegram_handle": applicant.telegramHandle === "None" ? undefined : (applicant.telegramHandle.charCodeAt(0) - 65),
            "linkedin_link": applicant.linkedInLink === "None" ? undefined : (applicant.linkedInLink.charCodeAt(0) - 65),
            "socialmedia_links": applicant.socialMediaLinks === "None" ? undefined : (applicant.socialMediaLinks.charCodeAt(0) - 65),
            "github_handle": applicant.gitHubHandle === "None" ? undefined : (applicant.gitHubHandle.charCodeAt(0) - 65),
            "educational_placement": applicant.educationalPlacement === "None" ? undefined : (applicant.educationalPlacement.charCodeAt(0) - 65),
            "specialty_at_university": applicant.specialtyAtUniversity === "None" ? undefined : (applicant.specialtyAtUniversity.charCodeAt(0) - 65),
            "job_placement": applicant.jobPlacement === "None" ? undefined : (applicant.jobPlacement.charCodeAt(0) - 65),
            "programming_experience": applicant.programmingExperienceDescription === "None" ? undefined : (applicant.programmingExperienceDescription.charCodeAt(0) - 65),
            "past_projects": applicant.pastProgrammingProjects === "None" ? undefined : (applicant.pastProgrammingProjects.charCodeAt(0) - 65),
            "achievements": applicant.bestAchievements === "None" ? undefined : (applicant.bestAchievements.charCodeAt(0) - 65),
            "availability_in_almaty": applicant.availabilityInAlmaty === "None" ? undefined : (applicant.availabilityInAlmaty.charCodeAt(0) - 65),
            "need_accommodation_in_almaty": applicant.needAccommodationInAlmaty === "None" ? undefined : (applicant.needAccommodationInAlmaty.charCodeAt(0) - 65),
            "representative_groups": applicant.representativeGroups === "None" ? undefined : (applicant.representativeGroups.charCodeAt(0) - 65),
        }
        const data = {
            table_url: url,
            markers,
            applicants_count: count
        };

        const id = toast.info("Processing...", {
            autoClose: false
        })
        const res = await axiosInstance.post("/feedback/", data);

        toast.dismiss(id);
        toast.success(`Feedback loaded successfully.`)
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div>
                <Label htmlFor="url" className="block w-full text-sm font-bold text-foreground text-start">
                  Excel url
                </Label>
                <div className="mt-1 flex gap-2">
                  <Input
                    onChange={(e) => setUrl(e.target.value)}
                    id="url"
                    name="url"
                    autoComplete="current-url"
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                <Button
                  onClick={(e) => sendData()}
                  className="flex w-2/5 justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Check
                </Button>
                <Button
                  onClick={(e) => feedback()}
                  className="flex w-2/5 justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Load feedback
                </Button>
                <Button
                  onClick={(e) => testData()}
                  className="flex w-2/5 justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Test
                </Button>
                </div>
                <Label htmlFor="url" className="block w-full text-sm font-bold text-foreground text-start">
                  Applicants count
                </Label>
                <Input
                    value={count}
                    onChange={(e) => {
                        if (e.target.value === "") setCount(0);
                        const value = parseInt(e.target.value);
                        if (isNaN(value)) return;
                        setCount(value);
                    }}
                    id="count"
                    name="count"
                    autoComplete="current-count"
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                <div className="w-full rounded-lg shadow-lg my-5 p-10">
                    <div className="flex justify-between">
                        <h1 className="font-bold text-foreground">Criteria</h1>
                        <h1 className="font-bold text-foreground">Column</h1>
                    </div>
                    <Card text="Full Name" value={applicant.fullName} setValue={(s: string) => setApplicant({...applicant, fullName: s })}/>
                    <Card text="Email" value={applicant.email} setValue={(s: string) => setApplicant({...applicant, email: s })}/>
                    <Card text="Birth Date" value={applicant.birthDate} setValue={(s: string) => setApplicant({...applicant, birthDate: s })}/>
                    <Card text="Phone Number" value={applicant.phoneNumber} setValue={(s: string) => setApplicant({...applicant, phoneNumber: s })}/>
                    <Card text="Programming Skill Level" value={applicant.programmingSkillLevel} setValue={(s: string) => setApplicant({...applicant, programmingSkillLevel: s })}/>
                    <Card text="CV" value={applicant.cv} setValue={(s: string) => setApplicant({...applicant, cv: s })}/>
                    <Card text="Willing To Participate On Paid Basis" value={applicant.willingToParticipateOnPaidBasis} setValue={(s: string) => setApplicant({...applicant, willingToParticipateOnPaidBasis: s })}/>
                    <Card text="Telegram Handle" value={applicant.telegramHandle} setValue={(s: string) => setApplicant({...applicant, telegramHandle: s })}/>
                    <Card text="LinkedIn Link" value={applicant.linkedInLink} setValue={(s: string) => setApplicant({...applicant, linkedInLink: s })}/>
                    <Card text="Social Media Links" value={applicant.socialMediaLinks} setValue={(s: string) => setApplicant({...applicant, socialMediaLinks: s })}/>
                    <Card text="GitHub Handle" value={applicant.gitHubHandle} setValue={(s: string) => setApplicant({...applicant, gitHubHandle: s })}/>
                    <Card text="Educational Placement" value={applicant.educationalPlacement} setValue={(s: string) => setApplicant({...applicant, educationalPlacement: s })}/>
                    <Card text="Specialty At University" value={applicant.specialtyAtUniversity} setValue={(s: string) => setApplicant({...applicant, specialtyAtUniversity: s })}/>
                    <Card text="Job Placement" value={applicant.jobPlacement} setValue={(s: string) => setApplicant({...applicant, jobPlacement: s })}/>
                    <Card text="Programming Experience Description" value={applicant.programmingExperienceDescription} setValue={(s: string) => setApplicant({...applicant, programmingExperienceDescription: s })}/>
                    <Card text="Past Programming Projects" value={applicant.pastProgrammingProjects} setValue={(s: string) => setApplicant({...applicant, pastProgrammingProjects: s })}/>
                    <Card text="Best Achievements" value={applicant.bestAchievements} setValue={(s: string) => setApplicant({...applicant, bestAchievements: s })}/>
                    <Card text="Availability In Almaty" value={applicant.availabilityInAlmaty} setValue={(s: string) => setApplicant({...applicant, availabilityInAlmaty: s })}/>
                    <Card text="Need Accommodation In Almaty" value={applicant.needAccommodationInAlmaty} setValue={(s: string) => setApplicant({...applicant, needAccommodationInAlmaty: s })}/>
                    <Card text="Representative Groups" value={applicant.representativeGroups} setValue={(s: string) => setApplicant({...applicant, representativeGroups: s })}/>
                </div>
            </div>
            <div className="mx-4 h-full">
                <Label>Github repo url</Label>
                <Input
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    required
                    className="block w-full my-3 appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                />
                <Label>Branch</Label>
                <Input
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    required
                    className="block w-full my-3 appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                  />
                <Button onClick={githubCheck}>Check github repo</Button>
            </div>
        </div>
    )
}

function Card({ text, value, setValue }: { text: string, value: string, setValue: any }) {

    const change = (e: any) => {
        setValue(e.target.value);
    }

    return (
        <div className="">
            <div className="flex justify-between">
                <h1 className="text-foreground my-2">{text}</h1>
                <select value={value} onChange={change}>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                    <option value="G">G</option>
                    <option value="H">H</option>
                    <option value="I">I</option>
                    <option value="J">J</option>
                    <option value="K">K</option>
                    <option value="L">L</option>
                    <option value="M">M</option>
                    <option value="N">N</option>
                    <option value="O">O</option>
                    <option value="P">P</option>
                    <option value="Q">Q</option>
                    <option value="R">R</option>
                    <option value="S">S</option>
                    <option value="T">T</option>
                    <option value="None">None</option>
                </select>
            </div>
        </div>
    )
}