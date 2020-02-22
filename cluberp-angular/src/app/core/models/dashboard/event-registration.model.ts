export class EventRegistration {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  early_bird_date: string;
  is_single_day_event = false;
  start_time: string;
  end_time: string;
  venue_location: string;
  label: string;
  type: string;
  category: string;
  organizer: string;
  title_images: string;
  description_images: string;
  summary: string;
  allow_group_registration = true;
  max_group_limit = 1;
  status = 'Testing';
  show_total_capacity = false;
  show_remaining_seats = false;
  is_published = false;
  show_start_time = false;
  show_end_time = false;
}

