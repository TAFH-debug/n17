a = """
    full_name: str
    email: str
    birth_date: str
    phone_number: str
    programming_skill_level: str
    cv: str | None
    on_paid_basis: str
    telegram_handle: str
    linkedin_link: str
    socialmedia_links: str
    github_handle: str
    educational_placement: str
    specialty_at_university: str
    job_placement: str | None
    programming_experience: str
    past_projects: str
    achievements: str
    availability_in_almaty: str
    needAccommodation_in_almaty: str
    representative_groups: str
    """

print("\n".join(["\"" + i.split(": ")[0].strip() + "\": \"a\"," for i in a.split("\n")]))

