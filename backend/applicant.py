from enum import Enum

from pydantic import BaseModel

class ProgrammingSkillLevel(Enum):
    NoExperience = "No experience"
    ITStudent = "IT student"
    CompetitiveProgrammer = "Competitive programmer"
    ProfessionalDeveloper = "Professional developer"

class Param:
    name: str
    value: str
    used_to_gpt: bool

class BaseApplicant(BaseModel):
    full_name: int | None = None
    email: int | None = None
    birth_date: int | None = None
    phone_number: int | None = None
    programming_skill_level: int | None = None
    cv: int | None = None
    on_paid_basis: int | None = None
    telegram_handle: int | None = None
    linkedin_link: int | None = None
    socialmedia_links: int | None = None
    github_handle: int | None = None
    educational_placement: int | None = None
    specialty_at_university: int | None = None
    job_placement: int | None = None
    programming_experience: int | None = None
    past_projects: int | None = None
    achievements: int | None = None
    availability_in_almaty: int | None = None
    need_accommodation_in_almaty: int | None = None
    representative_groups: int | None = None

class Applicant:
    full_name: str
    email: str
    birth_date: str
    phone_number: str
    programming_skill_level: ProgrammingSkillLevel
    cv: str | None
    on_paid_basis: bool
    telegram_handle: str
    linkedin_link: str
    socialmedia_links: list[str]
    github_handle: str
    educational_placement: str
    specialty_at_university: str
    job_placement: str | None
    programming_experience: str
    past_projects: str
    achievements: str
    availability_in_almaty: bool
    need_accommodation_in_almaty: bool
    representative_groups: list[str]
