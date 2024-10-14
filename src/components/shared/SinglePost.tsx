"use client"
import Image from "next/image";
import avatar from "@/assets/images/man.png";
import { HiBadgeCheck } from "react-icons/hi";
import PostEditComp from "@/components/page/profile/PostEditComp";
import ReactHTMLParser from "html-react-parser";
import PostDelete from "../page/profile/PostDelete";
import PostImage from "../page/profile/PostImage";
import PostInteract from "../page/profile/PostInteract";
import PostComments from "../page/profile/PostComments";
import moment from "moment";
import { useCheckLoginQuery } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { usePaymentPostMutation } from "@/redux/api/postApi";
import { useRouter } from "next/navigation";
import { useFollowUserMutation, useUnfollowUserMutation } from "@/redux/api/userApi";

const SinglePost = ({ postInfo, editOption = false }: any) => {
  const { data: userData, refetch } = useCheckLoginQuery(undefined);  

  
  const [alertOpen, setAlertOpen] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const router = useRouter();

  // follow unfollow
  const [follow, {}] = useFollowUserMutation(userData);
  const [unfollow, {}] = useUnfollowUserMutation(userData);

  const [doPayment, {}] = usePaymentPostMutation(userData);

  const isUserGetAccess = postInfo?.accessUser.some(
    (item: any) => item === userData.data._id
  );
  
  const isUserFollowing = userData?.data.following.some(
    (item: any) => item === postInfo.user._id
  );

 const handleUserContent = () => {
  if(userData.data._id !== postInfo.user._id &&
  !isUserFollowing){
    toast({title: "please follow to see the user content"})
    return;
  }
  router.push(`/profile/${postInfo.user._id}`)
 }

  // follow unfollow
  async function handleFollow(){
    await follow({token: userData.data.token, userId: userData.data._id, postBody: {following: postInfo.user._id}})
  }
  async function handleUnFollow(){
    await unfollow({token: userData.data.token, userId: userData.data._id, postBody: {following: postInfo.user._id}})
  }

  const handlePay = async () => {
    toast({ title: "Payment is ongoing..." });
    setAlertOpen("open");
    try {
      if (!stripe || !elements) {
        setAlertOpen("open");
        toast({ description: "stripe and element not found" });
        return;
      }

      const card = elements.getElement(CardElement);

      if (card == null) {
        setAlertOpen("open");
        toast({ description: "card not found" });
        return;
      }

      // const { error, paymentMethod } = await stripe.createPaymentMethod({
      const { error } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        toast({ description: "payment error" });
        setAlertOpen("open");
        return;
      }

      const completePayment = await doPayment({
        token: userData?.data.token,
        postBody: { accessUser: userData?.data._id },
        postId: postInfo?._id,
      });
      if (completePayment?.data?.success) {
        await stripe
          .confirmCardPayment(completePayment.data.data.clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: userData.data?.name,
                email: userData.data?.email,
              },
            },
          })
          .then(async function (result: any) {
            if (result.error) {
              toast({
                description: "Your payment failed",
              });
            }
            if (result.paymentIntent) {
              setAlertOpen("close");
              toast({
                description: "Your payment is completed successfully",
              });
            }
          });
      }
    } catch (e) {
      toast({ description: e + "" });
    }
  };

  useEffect(() => {
    if (!userData) refetch();
  }, []);
  return (
    <>
      <div className="post_single border rounded-md mb-5 p-4">
        <div className="post_header flex items-center justify-between">
          <div className="user flex items-center gap-2">
            <Image
              className="rounded-full border-2 border-secondary cursor-pointer"
              src={postInfo.user.profile_picture || avatar}
              width={40}
              height={40}
              alt="profile picture"
            />
            <div className="user_details">
              <div className="flex items-center gap-2">
                <h3
                  onClick={handleUserContent}
                  className="text-sm font-bold hover:underline cursor-pointer"
                >
                  {postInfo.user.name}
                </h3>

                {userData.data._id !== postInfo.user._id && isUserFollowing && (
                  <Button onClick={handleUnFollow} className="bg-primary px-2 text-white" size={null}>
                    UnFollow
                  </Button>
                )}
                {userData.data._id !== postInfo.user._id &&
                  !isUserFollowing && (
                    <Button onClick={handleFollow} className="bg-primary px-2 text-white" size={null}>
                      Follow
                    </Button>
                  )}
              </div>

              <p className="text-xs text-gray-600">
                {moment(postInfo.createdAt).format("MM-DD-YY, h:mm:ss a")}
              </p>
            </div>
          </div>
          <div className="premium_badge_n_edit flex items-center gap-1">
            {postInfo.type === "premium" && (
              <HiBadgeCheck size={20} className="text-accent" />
            )}

            {editOption && (
              <PostEditComp
                postDesc={postInfo?.description}
                postId={postInfo?._id}
              />
            )}
            {editOption && <PostDelete postId={postInfo?._id} />}
          </div>
        </div>
        <div className="post_body my-2">
          {/* premium and payed by user */}
          {postInfo.type === "premium" &&
            isUserGetAccess &&
            ReactHTMLParser(postInfo?.description)}
          {/* premium but self post*/}
          {postInfo.type === "premium" &&
            postInfo.user._id === userData.data._id &&
            ReactHTMLParser(postInfo?.description)}
          {/* premium not self post and not payed by user */}
          {postInfo.type === "premium" &&
            postInfo.user._id !== userData.data._id &&
            !isUserGetAccess && (
              <>
                {ReactHTMLParser(
                  postInfo?.description
                    .slice(0, postInfo?.description.length / 3)
                    .replace(/<\/?[^>]+(>|$)/g, "")
                )}
                {"..."}

                <AlertDialog
                  onOpenChange={() => setAlertOpen("undefined")}
                  open={
                    alertOpen === "open"
                      ? true
                      : alertOpen === "close"
                      ? false
                      : undefined
                  }
                >
                  <AlertDialogTrigger asChild>
                    <Button className="text-blue-400" variant="link">
                      See Full Content
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Please Pay $20 to see full content.
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        <CardElement
                          options={{
                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                  color: "#aab7c4",
                                },
                              },
                              invalid: {
                                color: "#9e2146",
                              },
                            },
                          }}
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button onClick={handlePay}>Pay $20</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </>
            )}
          {/* regular post */}
          {postInfo.type !== "premium" && (
            <>
              {ReactHTMLParser(postInfo?.description)}
              <PostImage postImages={postInfo?.image_attachments} />
            </>
          )}
        </div>
        <PostInteract postInfo={postInfo} />
        <PostComments postInfo={postInfo} />
      </div>
    </>
  );
};

export default SinglePost;