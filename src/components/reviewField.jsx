import { Description, Field, Label, Textarea } from '@headlessui/react'
import { Button } from '@headlessui/react'
import { MusicNotesRating } from './musicNotesRating.jsx'
import { useApi } from '../hooks/useApi.jsx'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter } from "@material-tailwind/react"

export const ReviewField = ({ itemType, itemId, rating }) => {
  const queryClient = useQueryClient();
  const defaultScore = rating?.score || 0;
  const [score, setScore] = useState(defaultScore);
  const api = useApi();

  const { mutateAsync: upsertRating } = useMutation({
    mutationKey: ['rating', itemType, itemId],
    scope: "rating",
    mutationFn: ({ score, review }) => api.fetch(`ratings/${itemType}s/${itemId}`, { method: 'post', body: { score, review } }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ratings'] })
  });

  const { mutateAsync: deleteRating } = useMutation({
    mutationKey: ['rating', itemType, itemId],
    scope: "rating",
    mutationFn: () => api.fetch(`ratings/${itemType}s/${itemId}`, { method: 'delete' }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['ratings'] })
  });

  function handleSubmit(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    // Read the form data
    const form = e.target;
    const formData = new FormData(form);
    const newReview = formData.get('review');
    upsertRating({ score, review: newReview });
  };

  function handleDelete(e) {
    // Prevent the browser from reloading the page
    e.preventDefault();
    deleteRating();
  };

  return (
    <form method="post" onSubmit={handleSubmit} className='flex flex-col items-center mb-5'>
      <Card className="w-full mt-4" color="gray" >
        <CardHeader
          shadow={false}
          floated={false}
          className="mt-4 flex items-center gap-4 p-3"
          color="gray"
        >
          <MusicNotesRating value={score} setValue={setScore} className="h-10"/>
        </CardHeader>
        <CardBody className="p-3 flex">
          <Field className="flex flex-col justify-items-start w-full h-fit">
            <Label className="text-sm/6 font-medium text-white text-start pl-4 pb-2">Leave a review</Label>
            <Description className="text-sm/6 text-white/50 text-start pl-4 pb-2">Share your opinion.</Description>
            <Textarea
              className=
              'mt-3 block h-fit resize-none rounded-lg border-none bg-darkgray-900 py-1.5 px-3 text-sm/6 text-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
              rows={5}
              name="review"
              defaultValue={rating?.review}
            ></Textarea>
          </Field>
        </CardBody>
        <CardFooter className="p-3 flex justify-end mb-3 mr-2 gap-3">
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="inline-flex items-center gap-2 rounded-md bg-pink-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
            type="button"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* <div className="w-full max-w-md px-4"></div> */}
    </form>
  )
}