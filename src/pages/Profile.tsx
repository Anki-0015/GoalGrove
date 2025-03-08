
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import { useTheme } from "@/components/theme/ThemeProvider";
import FadeIn from "@/components/animations/FadeIn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, LogOut, Save, User } from "lucide-react";

const ProfilePage = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+91 9876543210",
    avatar: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved successfully."
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };
  
  return (
    <div className={`min-h-screen ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-blue-50 to-white'
    }`}>
      <Header />
      <div className="pt-24 px-6 md:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground mb-8">Manage your account and preferences</p>
          </FadeIn>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <FadeIn delay={0.1} className="lg:col-span-1">
              <div className="glass-panel p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={formData.avatar || ""} alt={`${formData.firstName} ${formData.lastName}`} />
                  <AvatarFallback className="text-xl">{formData.firstName.charAt(0)}{formData.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h2>
                <p className="text-sm text-muted-foreground mt-1">{formData.email}</p>
                
                <div className="mt-6 space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <User size={16} className="mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard size={16} className="mr-2" />
                    Payment Methods
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Log Out
                  </Button>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2} className="lg:col-span-3">
              <div className="glass-panel p-6">
                <Tabs defaultValue="personal">
                  <TabsList className="mb-6">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal">
                    <form onSubmit={handleSave}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="avatar">Profile Picture URL</Label>
                          <Input 
                            id="avatar"
                            name="avatar"
                            value={formData.avatar}
                            onChange={handleInputChange}
                            placeholder="https://example.com/avatar.jpg"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-8 flex justify-end">
                        <Button type="submit">
                          <Save size={16} className="mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="security">
                    <Card>
                      <CardHeader>
                        <CardTitle>Password & Security</CardTitle>
                        <CardDescription>
                          Manage your password and security preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input id="currentPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input id="newPassword" type="password" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input id="confirmPassword" type="password" />
                          </div>
                          <Button className="w-full">Update Password</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="preferences">
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>
                          Manage how and when you want to be notified
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">
                          Coming soon! You'll be able to customize your notification preferences here.
                        </p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
