import React, { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  background: ${({ theme }) => theme.colors.ivoire};
  padding: 3.5rem 1.5rem 2.5rem 1.5rem;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.accent};
  color: ${({ theme }) => theme.colors.marronFonce};
  font-size: 2.8rem;
  text-align: center;
  margin-bottom: 0.2em;
`;

const Date = styled.p`
  font-family: ${({ theme }) => theme.fonts.accent};
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.noir};
  text-align: left;
  margin: 1.5rem 0 2.5rem 0.5rem;
`;

const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 700px) {
    display: block;
    position: relative;
    max-width: 500px;
    padding-left: 30px;
    &:before {
      content: '';
      position: absolute;
      left: 18px;
      top: 0;
      bottom: 0;
      width: 4px;
      background: ${({ theme }) => theme.colors.caramel};
      border-radius: 2px;
      z-index: 0;
    }
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.blanc};
  border-radius: 18px;
  box-shadow: 0 2px 16px rgba(90,60,40,0.10);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  transition: transform 0.18s, box-shadow 0.18s;
  margin-bottom: 0;
  &:hover {
    transform: translateY(-6px) scale(1.025);
    box-shadow: 0 6px 24px rgba(90,60,40,0.13);
  }
  @media (max-width: 700px) {
    margin-left: 35px;
    margin-bottom: 2.5rem;
    min-width: 0;
    box-shadow: 0 2px 12px rgba(90,60,40,0.07);
    padding: 1.2rem 1.5rem 1.2rem 2.2rem;
  }
`;

const Dot = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;
    position: absolute;
    left: 10px;
    top: 28px;
    width: 18px;
    height: 18px;
    background: ${({ theme }) => theme.colors.terracotta};
    border-radius: 50%;
    border: 3px solid ${({ theme }) => theme.colors.blanc};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.caramel};
    z-index: 2;
  }
`;

const Time = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.caramel};
  font-size: 1.12rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.div`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.marronFonce};
  font-size: 1.22rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const Location = styled.div`
  font-size: 1.01rem;
  color: ${({ theme }) => theme.colors.noir};
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

const AddToCalendar = styled.button`
  font-size: 0.97rem;
  color: ${({ theme }) => theme.colors.terracotta};
  font-weight: 600;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 0.2rem;
  display: inline-block;
  background: none;
  border: none;
  padding: 0;
`;

const CalendarMenu = styled.div`
  position: absolute;
  top: 2.2rem;
  left: 0;
  background: ${({ theme }) => theme.colors.blanc};
  border: 1.5px solid ${({ theme }) => theme.colors.caramel};
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(90,60,40,0.13);
  z-index: 10;
  min-width: 180px;
  padding: 0.5rem 0.2rem;
  display: flex;
  flex-direction: column;
`;

const CalendarMenuItem = styled.a`
  color: ${({ theme }) => theme.colors.marronFonce};
  font-size: 1rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  cursor: pointer;
  border-radius: 7px;
  transition: background 0.15s;
  &:hover {
    background: ${({ theme }) => theme.colors.ivoire};
  }
`;

const Pin = () => (
  <span style={{fontSize: '1.1em', marginRight: '0.2em'}}>📍</span>
);

// Helper functions for calendar links
function formatDateTime(date, timeRange) {
  // date: '2026-04-11', timeRange: '16h00 - 18h00'
  // returns: ['20260411T160000', '20260411T180000']
  const [start, end] = timeRange.split(' - ');
  function to24h(t) {
    let [h, m] = t.replace('h', ':').split(':');
    if (!m) m = '00';
    return `${h.padStart(2, '0')}${m.padStart(2, '0')}`;
  }
  const ymd = date.replace(/-/g, '');
  return [
    `${ymd}T${to24h(start)}`,
    `${ymd}T${to24h(end)}`,
  ];
}

function getGoogleCalendarUrl({ title, location, details, start, end }) {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  return `${base}&text=${encodeURIComponent(title)}&dates=${start}/${end}&location=${encodeURIComponent(location)}&details=${encodeURIComponent(details)}`;
}

function getOutlookCalendarUrl({ title, location, details, start, end }) {
  const base = 'https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose';
  return `${base}&subject=${encodeURIComponent(title)}&body=${encodeURIComponent(details)}&startdt=${start}&enddt=${end}&location=${encodeURIComponent(location)}`;
}

function getICSContent({ title, location, details, start, end }) {
  return `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${title}\nDTSTART:${start}\nDTEND:${end}\nLOCATION:${location}\nDESCRIPTION:${details}\nEND:VEVENT\nEND:VCALENDAR`;
}

const agendaData = [
  {
    time: '12h00 - 14h00',
    title: 'Cérémonie civile',
    location: 'Hôtel De Ville De Yaoundé, Cameroun',
    details: 'Cérémonie civile. Hôtel De Ville De Yaoundé, Cameroun. Mariage Brandon & Larenne.'
  },
  {
    time: '14h00 - 15h00',
    title: 'Séance photos',
    location: "Esplanade de l'hôtel De Ville De Yaoundé, Cameroun",
    details: "Séance photos. Esplanade de l'hôtel De Ville De Yaoundé, Cameroun. Mariage Brandon & Larenne."
  },
  {
    time: '15h00 - 17h00',
    title: 'Apéro et toast',
    location: "Salle des fêtes Bouton d'or - Vital Plus, Av. Mgr Vogt, Yaoundé, Cameroun",
    details: "Apéro et toast. Salle des fêtes Bouton d'or - Vital Plus, Av. Mgr Vogt, Yaoundé, Cameroun. Mariage Brandon & Larenne."
  },
  {
    time: '18h00 - 20h00',
    title: 'Dîner',
    location: "Salle des fêtes Bouton d'or - Vital Plus, Av. Mgr Vogt, Yaoundé, Cameroun",
    details: "Dîner. Salle des fêtes Bouton d'or - Vital Plus, Av. Mgr Vogt, Yaoundé, Cameroun. Mariage Brandon & Larenne."
  },
  {
    time: '20h00 - 04h00',
    title: 'Ouverture de bal et piste de danse',
    location: "Salle des fêtes Bouton d'or - Vital Plus, Av. Mgr Vogt, Yaoundé, Cameroun",
    details: "Ouverture de bal et piste de danse. Salle des fêtes Bouton d'or - Vital Plus, Av. Mgr Vogt, Yaoundé, Cameroun. Mariage Brandon & Larenne."
  },
];

const eventDate = '2026-04-11';

export default function Agenda() {
  const [openMenuIdx, setOpenMenuIdx] = useState(null);

  const handleICSDownload = (icsContent, title) => {
    const blob = new Blob([icsContent.replace(/\\n/g, '\r\n')], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <Section>
      <Title>Agenda</Title>
      <hr style={{width: '60px', border: '1.5px solid #C68B59', margin: '0.5em auto 2em auto', borderRadius: '2px'}} />
      <Date>11 April 2026</Date>
      <ResponsiveGrid>
        {agendaData.map((item, idx) => {
          const [start, end] = formatDateTime(eventDate, item.time);
          const googleUrl = getGoogleCalendarUrl({
            title: item.title,
            location: item.location,
            details: item.details,
            start,
            end,
          });
          const outlookUrl = getOutlookCalendarUrl({
            title: item.title,
            location: item.location,
            details: item.details,
            start,
            end,
          });
          const icsContent = getICSContent({
            title: item.title,
            location: item.location,
            details: item.details,
            start,
            end,
          });
          return (
            <div key={idx} style={{position: 'relative'}}>
              <Dot />
              <Card>
                <Time>{item.time}</Time>
                <EventTitle>{item.title}</EventTitle>
                <Location><Pin />{item.location}</Location>
                <AddToCalendar
                  onClick={() => setOpenMenuIdx(openMenuIdx === idx ? null : idx)}
                  aria-haspopup="true"
                  aria-expanded={openMenuIdx === idx}
                >
                  + Add to calendar
                </AddToCalendar>
                {openMenuIdx === idx && (
                  <CalendarMenu onMouseLeave={() => setOpenMenuIdx(null)}>
                    <CalendarMenuItem href={googleUrl} target="_blank" rel="noopener noreferrer">Google Calendar</CalendarMenuItem>
                    <CalendarMenuItem href="#" onClick={e => { e.preventDefault(); handleICSDownload(icsContent, item.title); setOpenMenuIdx(null); }}>Apple / Outlook (.ics)</CalendarMenuItem>
                    <CalendarMenuItem href={outlookUrl} target="_blank" rel="noopener noreferrer">Outlook Online</CalendarMenuItem>
                  </CalendarMenu>
                )}
              </Card>
            </div>
          );
        })}
      </ResponsiveGrid>
    </Section>
  );
} 