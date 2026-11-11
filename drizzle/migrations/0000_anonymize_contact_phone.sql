CREATE OR REPLACE FUNCTION public.anonymize_contact_phone(_digits text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _digits IS NULL OR length(_digits) < 6 THEN RETURN; END IF;
  UPDATE public.email_send_log
     SET metadata = jsonb_build_object('anonymized', true),
         error_message = CASE WHEN error_message IS NULL THEN NULL ELSE '[anonymized]' END
   WHERE regexp_replace(coalesce(metadata::text,'') || coalesce(error_message,''), '\D', '', 'g') LIKE '%' || _digits || '%';
END $$;
REVOKE ALL ON FUNCTION public.anonymize_contact_phone(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.anonymize_contact_phone(text) TO service_role;